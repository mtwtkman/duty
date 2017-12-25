from django.db import models
from django.forms.models import model_to_dict as md


class AsDictMixin:
    def as_dict(self):
        return md(self)


foreign_key = 'Member'


class OrderedAbstract(AsDictMixin, models.Model):
    member = models.ForeignKey(foreign_key, on_delete=models.CASCADE)
    order = models.IntegerField()

    def as_dict(self):
        data = self.member.as_dict()
        data.update({'order': self.order})
        return data

    class Meta:
        abstract = True


class AsigneeAbstract(models.Model):
    member = models.ForeignKey(foreign_key, on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
