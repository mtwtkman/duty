from django.db import models
from pytz import timezone

from . import AsDictMixin


foreign_key = 'Member'


class FacilitatorOrder(AsDictMixin, models.Model):
    member = models.ForeignKey(foreign_key, on_delete=models.CASCADE)
    order = models.IntegerField()

    def as_dict(self):
        data = self.member.as_dict()
        data.update({'order': self.order})
        return data

    class Meta:
        db_table = 'facilitator_orders'


class Facilitator(models.Model):
    member = models.ForeignKey(foreign_key, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'facilitator'


class FacilitatorAssignedLog(models.Model):
    OPERATION_TYPES = (
        (1, 'done'),
        (2, 'redo'),
    )

    member = models.ForeignKey(foreign_key, on_delete=models.CASCADE)
    operation_type = models.IntegerField(choices=OPERATION_TYPES)
    updated_at = models.DateTimeField(auto_now=True)

    def messagify(self):
        return {
            'message': '{} {}'.format(
                self.updated_at.astimezone(tz=timezone('Asia/Tokyo')).strftime('%Y/%m/%d %H:%M:%S'),
                {1: '{}さんが完了'.format(self.member.name), 2: 'やり直し'}[self.operation_type]
            )
        }

    class Meta:
        db_table = 'facilitator_assigned_logs'
