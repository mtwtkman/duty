import json

from django.views.generic import View
from django.http import JsonResponse
from django.db import transaction

from domain.models import meeting
from .forms import FacilitatorForm


class Facilitator(View):
    http_method_names = ['get', 'post', 'put']

    def get(self, request):
        facilitator = meeting.Facilitator.objects.all()
        if facilitator.count() == 0:
            return JsonResponse({'message': 'Facilitator is must be elected'}, status=400)
        return JsonResponse({'message': 'ok', 'data': facilitator[0].member.as_dict()})

    @transaction.atomic
    def post(self, request):
        data = json.loads(request.body.decode())
        form = FacilitatorForm(data)
        if not form.is_valid():
            return JsonResponse({'message': form.errors})
        facilitator = self.update(form.cleaned_data['member_id'])
        return JsonResponse({'message': 'ok', 'facilitator': facilitator.as_dict()})

    @transaction.atomic
    def put(self, request):
        data = json.loads(request.body.decode())
        form = FacilitatorForm(data)
        if not form.is_valid():
            return JsonResponse({'message': form.errors})
        facilitator = self.update(form.cleaned_data['member_id'])
        return JsonResponse({'message': 'ok', 'facilitator': facilitator.as_dict()})

    def update(self, member_id):
        meeting.Facilitator.objects.all().delete()
        meeting.Facilitator.objects.create(member_id=member_id)
        return meeting.FacilitatorOrder.objects.get(member_id=member_id)


class Members(View):
    http_method_names = ['get']

    def get(self, request):
        members = meeting.FacilitatorOrder.objects.all().order_by('order')
        return JsonResponse({'message': 'ok', 'members': [x.as_dict() for x in members]})
