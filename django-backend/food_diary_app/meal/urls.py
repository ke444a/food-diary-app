from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MealsList, LogListView, LogViewset

router = DefaultRouter()
router.register(r'logs', LogViewset, basename='logs')

urlpatterns = [
    path('logs/', LogListView.as_view()),
    path('', include(router.urls)),
    path('meals/', MealsList.as_view()),
]