from django.urls import path, include

from .views import Index


app_name = 'meeting'
urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('api/meeting/', include('meeting.api.urls', namespace='api')),
]
