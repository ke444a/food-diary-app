from rest_framework import viewsets, permissions, generics
from .serializers import MealSerializer, LogSerializer, FavoriteSerializer
from .models import Meal, Log, Favorite
from django.contrib.auth import get_user_model

User = get_user_model()

class MealsList(generics.ListAPIView):
    serializer_class = MealSerializer

    def get_queryset(self):
        queryset = Meal.objects.all()
        meal_type = self.request.query_params.get('meal_type', None)
        if meal_type is not None:
            queryset = queryset.filter(meal_type=meal_type)
        return queryset

class LogListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LogSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        meal_type = self.request.query_params.get('meal_type', None)
        date = self.request.query_params.get('date', None)
        
        queryset = Log.objects.all()
        if date and meal_type:
            queryset = queryset.filter(user=User.objects.get(id=user_id), date=date, meal_type=meal_type)
        elif meal_type:
            queryset = queryset.filter(user=User.objects.get(id=user_id), meal_type=meal_type)
        elif date:
            queryset = queryset.filter(user=User.objects.get(id=user_id), date=date)
        else:
            queryset = queryset.filter(user=User.objects.get(id=user_id))
        return queryset

class LogViewset(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LogSerializer
    queryset = Log.objects.all()

    
class FavoriteListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        queryset = Favorite.objects.filter(user=User.objects.get(id=user_id))
        return queryset
    
class FavoriteViewset(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FavoriteSerializer
    queryset = Favorite.objects.all()