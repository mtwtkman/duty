from django.db import models

from . import AsDictMixin


class Member(AsDictMixin, models.Model):
    name = models.CharField(max_length=20)

    class Meta:
        db_table = 'members'
