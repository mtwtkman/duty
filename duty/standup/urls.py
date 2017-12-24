from django.urls import path, include

from .views import Index


app_name = 'standup'
urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('api/standup/', include('standup.api.urls', namespace='api')),
]
