from django.db import models

from . import AsDictMixin
from .meeting import FacilitatorOrder


class Member(AsDictMixin, models.Model):
    name = models.CharField(max_length=20)

    def save_with_facilitate_order(self):
        super().save()
        max_order = FacilitatorOrder.objects.all().aggregate(models.Max('order'))['order__max'] or 0
        FacilitatorOrder.objects.create(member_id=self.pk, order=max_order+1)
        return self

    class Meta:
        db_table = 'members'
