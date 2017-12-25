from django.views.generic import TemplateView


class Index(TemplateView):
    http_method_names = ['get']

    template_name = 'meeting/index.html'

    def get_context_data(self):
        return super().get_context_data()
