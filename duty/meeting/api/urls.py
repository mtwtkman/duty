from django.urls import path

from .views import Facilitator, Members


app_name = 'meeting_api'
urlpatterns = [
    path('assignee', Facilitator.as_view(), name='assignee'),
    path('members', Members.as_view(), name='members'),
]
