from django.views.generic import TemplateView


class Index(TemplateView):
    http_method_names = ['get']

    template_name = 'members/index.html'

    def get_context_data(self):
        context = super().get_context_data()
        return context
