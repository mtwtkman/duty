import json

from django.views.generic import View
from django.http import JsonResponse


class API(View):
    http_method_names = ['get']

    def get(self, request):
        return JsonResponse({})
