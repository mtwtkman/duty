from django.urls import include, path

from .views import Index
from . import api


app_name = 'members'

urlpatterns = [
    path('', Index.as_view()),
    path('api/members', api.Members.as_view()),
]
