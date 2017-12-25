from domain.models import standup
from commons.asignee_view import AsigneeViewAbstract, MembersViewAbstract


class Chairman(AsigneeViewAbstract):
    model_class = standup.Chairman
    order_model_class = standup.ChairmanOrder


class Members(MembersViewAbstract):
    model_class = standup.ChairmanOrder
