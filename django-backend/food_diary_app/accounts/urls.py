from django.urls import path, include
from knox import views as knox_views
from .views import RegisterUserView, LoginUserView, UpdateUserView

urlpatterns = [
    path('register', RegisterUserView.as_view(), name="register"),
    path('login', LoginUserView.as_view(), name="login"),
    path('logout', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('update_user/<int:pk>', UpdateUserView.as_view(),name='update_user'),
    # path('user/<int:pk>', GetUserView.as_view(),name='user'),
]