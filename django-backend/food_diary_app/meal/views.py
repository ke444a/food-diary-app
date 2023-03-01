from rest_framework import viewsets, permissions, generics
from .serializers import MealSerializer, LogSerializer
from .models import Meal, Log
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
        queryset = Log.objects.all()
        user_id = self.request.query_params.get('user_id')
        meal_type = self.request.query_params.get('meal_type', None)
        date = self.request.query_params.get('date', None)
        if date and meal_type:
            queryset = queryset.filter(user=User.objects.get(id=user_id), date=date, meal__meal_type=meal_type)
        elif meal_type:
            queryset = queryset.filter(user=User.objects.get(id=user_id), meal__meal_type=meal_type)
        else:
            queryset = queryset.filter(user=User.objects.get(id=user_id))
        return queryset

class LogViewset(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    