from django.urls import path

from .views import Chairman, Members


app_name = 'standup_api'
urlpatterns = [
    path('chairman', Chairman.as_view(), name='chairman'),
    path('members', Members.as_view(), name='members'),
]
