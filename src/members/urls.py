from django.urls import include, path

from .views import Index
from . import api


app_name = 'members'

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('api/members', api.Members.as_view(), name='api-members'),
    path(r'api/members/<int:member_id>', api.Member.as_view(), name='api-member'),
]
