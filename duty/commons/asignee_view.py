import json

from django.views.generic import View
from django import forms
from django.http import JsonResponse
from django.db import transaction
from django_bulk_update.helper import bulk_update

from domain.models import members


class AsigneeForm(forms.Form):
    member_id = forms.IntegerField()

    def clean_member_id(self):
        data = self.cleaned_data['member_id']
        try:
            members.Member.objects.get(pk=data)
        except members.Member.DoesNotExist:
            raise forms.ValidationError('member not found', params={'member_id': data})
        return data


class AsigneeViewAbstract(View):
    http_method_names = ['get', 'post', 'put']

    def get(self, request):
        obj = self.model_class.objects.all()
        if obj.count() == 0:
            return JsonResponse(
                {'message': '{} is must be elected'.format(self.model_class.__name__)},
                status=400
            )
        return JsonResponse({'message': 'ok', 'data': obj[0].member.as_dict()})

    @transaction.atomic
    def post(self, request):
        data = json.loads(request.body.decode())
        form = AsigneeForm(data)
        if not form.is_valid():
            return JsonResponse({'message': form.errors})
        member_id = form.cleaned_data['member_id']
        self.model_class.objects.all().delete()
        self.model_class.objects.create(member_id=member_id)
        obj = self.order_model_class.objects.get(member_id=member_id)
        return JsonResponse({'message': 'ok', 'data': obj.as_dict()})

    @transaction.atomic
    def put(self, request):
        data = {
            x['id']: x['order']
            for x in json.loads(request.body)
        }
        L = []
        for x in self.order_model_class.objects.all():
            x.order = data[x.pk]
            L.append(x)
        bulk_update(L, update_fields=['order'])
        return JsonResponse({'message': 'ok'});


class MembersViewAbstract(View):
    http_method_names = ['get']

    def get(self, request):
        return JsonResponse({
            'message': 'ok',
            'data': [x.as_dict() for x in self.model_class.objects.all().order_by('order')]
        })
