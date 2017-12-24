from domain.models import meeting
from commons.asignee_view import AsigneeViewAbstract, MembersViewAbstract


class Facilitator(AsigneeViewAbstract):
    model_class = meeting.Facilitator
    order_model_class = meeting.FacilitatorOrder


class Members(MembersViewAbstract):
    model_class = meeting.FacilitatorOrder
