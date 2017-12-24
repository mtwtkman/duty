from django.urls import path

from .views import Facilitator, Members


app_name = 'meeting_api'
urlpatterns = [
    path('facilitator', Facilitator.as_view(), name='facilitator'),
    path('members', Members.as_view(), name='members'),
]
