from django import forms

from domain.models.members import Member


class MemberForm(forms.Form):
    name = forms.CharField(max_length=20)
