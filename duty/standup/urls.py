from django.urls import path

from .views import Index
from .api import API


app_name = 'standup'
urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('api/standup', API.as_view(), name='api'),
]
