from django.urls import path, include
from knox import views as knox_views
from .views import RegisterUser, LoginUser

urlpatterns = [
    path('register', RegisterUser.as_view(), name="register"),
    path('login', LoginUser.as_view(), name="login"),
    path('logout', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
]