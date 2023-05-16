from django.urls import path
from . import views


urlpatterns = [
    path('index/' , views.index, name='index'),
    path('signup/' , views.signup, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/' , views.profile, name='profile'),
    path('' , views.login_view, name='login'),
    
]