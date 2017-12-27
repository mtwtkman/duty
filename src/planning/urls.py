from django.urls import path, include

from .poker.views import Poker


app_name = 'planning'
urlpatterns = [
    path('poker', Poker.as_view(), name='poker'),
]
