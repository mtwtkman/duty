from django.views.generic import TemplateView


class Poker(TemplateView):
    template_name = 'planning/poker.html'

    http_method_names = ['get']
