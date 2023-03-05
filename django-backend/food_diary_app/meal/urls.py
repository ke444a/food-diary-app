from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MealsList, LogListView, LogViewset, FavoritesListView, FavoritesViewset

router = DefaultRouter()
router.register(r'logs', LogViewset, basename='logs')
router.register(r'favorites', FavoritesViewset, basename='favorites')

urlpatterns = [
    path('logs/', LogListView.as_view()),
    path('meals/', MealsList.as_view()),
    path('favorites/', FavoritesListView.as_view()),
    path('', include(router.urls)),
]