from django import forms

from domain.models import members, meeting


class FacilitatorForm(forms.Form):
    member_id = forms.IntegerField()

    def clean_member_id(self):
        data = self.cleaned_data['member_id']
        try:
            members.Member.objects.get(pk=data)
        except members.Member.DoesNotExist:
            raise forms.ValidationError('member not found', params={'member_id': data})
        return data
