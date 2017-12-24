from django.db import models

from . import OrderedAbstract, AsigneeAbstract


foreign_key = 'Member'


class FacilitatorOrder(OrderedAbstract):
    class Meta(OrderedAbstract.Meta):
        db_table = 'facilitator_orders'


class Facilitator(AsigneeAbstract):
    class Meta(AsigneeAbstract.Meta):
        db_table = 'facilitator'
