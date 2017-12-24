import json

from django.views.generic import View
from django.http import JsonResponse
from django.db import transaction

from members.forms import MemberForm
import domain.models.members as model


class Members(View):
    http_method_names = ['get', 'post']

    def get(self, request):
        members = model.Member.roles.all()
        return JsonResponse({'data': [x.as_dict() for x in members]})

    @transaction.atomic
    def post(self, request):
        data = json.loads(request.body.decode())
        form = MemberForm(data)
        if not form.is_valid():
            status = 400
            body = {'message': form.errors}
        else:
            member = model.Member.objects.create(**data)
            status = 200
            body = {
                'message': 'ok',
                'data': member.as_dict(),
            }

        member.save_with_facilitate_order()
        return JsonResponse(body, status=status)


class Member(View):
    http_method_names = ['delete']

    @transaction.atomic
    def delete(self, request, member_id):
        try:
            member = model.Member.objects.get(pk=member_id)
        except model.Member.DoesNotExist:
            return JsonResponse({'message': 'Failed to delete a member'}, status=400)
        member.delete()
        return JsonResponse({'message': 'ok', 'data': member_id});
