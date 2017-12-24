from contextlib import closing

from django.db import models, connection
from django_bulk_update.helper import bulk_update

from . import AsDictMixin
from .meeting import FacilitatorOrder, Facilitator


class RoleManager(models.Manager):
    def get_queryset(self):
        with closing(connection.cursor()) as cursor:
            cursor.execute('''
            select
              m.id,
              m.name,
              case when f.id is not null then 1 else 0 end as is_facilitator
            from members as m
              left join facilitator as f
                on f.member_id = m.id
            ;
            ''')
            results = []
            for row in cursor.fetchall():
                x = self.model(id=row[0], name=row[1])
                x.is_facilitator = row[2]
                results.append(x)
        return results


class Member(AsDictMixin, models.Model):
    name = models.CharField(max_length=20)

    def save_with_facilitate_order(self):
        super().save()
        max_order = FacilitatorOrder.objects.all().aggregate(models.Max('order'))['order__max'] or 0
        FacilitatorOrder.objects.create(member_id=self.pk, order=max_order+1)
        return self

    def delete(self):
        super().delete()
        updates = []
        for i, x in enumerate(FacilitatorOrder.objects.all().order_by('order'), 1):
            x.order = i
            updates.append(x)
        bulk_update(updates, update_fields=['order'])

    objects = models.Manager()
    roles = RoleManager()

    def as_dict(self, with_role=False):
        data = super().as_dict()
        if hasattr(self, 'is_facilitator'):
            data['is_facilitator'] = self.is_facilitator == 1
        return data

    class Meta:
        db_table = 'members'
