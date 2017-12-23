from django.forms.models import model_to_dict as md


class AsDictMixin:
    def as_dict(self):
        return md(self)
