from django.db import models

from . import OrderedAbstract, AsigneeAbstract


class ChairmanOrder(OrderedAbstract):
    class Meta(OrderedAbstract.Meta):
        db_table = 'chairman_orders'


class Chairman(AsigneeAbstract):
    class Meta(AsigneeAbstract.Meta):
        db_table = 'chairman'
