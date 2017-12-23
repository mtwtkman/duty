from django.urls import path
from .views import Index

app_name = 'meeting'
urlpatterns = [
    path('', Index.as_view()),
]
