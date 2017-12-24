from django.urls import path

from .views import Chairman, Members


app_name = 'standup_api'
urlpatterns = [
    path('assignee', Chairman.as_view(), name='assignee'),
    path('members', Members.as_view(), name='members'),
]
