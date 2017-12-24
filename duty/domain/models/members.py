from django.db import models
from django_bulk_update.helper import bulk_update

from . import AsDictMixin
from .meeting import FacilitatorOrder


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

    class Meta:
        db_table = 'members'
