from django.urls import path, include

urlpatterns = [
    path('members/', include('members.urls', namespace='members')),
    path('meeting/', include('meeting.urls', namespace='meeting')),
    path('standup/', include('standup.urls', namespace='standup')),
    path('planning/', include('planning.urls', namespace='planning')),
    path('', include('home.urls', namespace='home')),
]
