from rest_framework import viewsets
from .serializers import MealSerializer
from .models import Meal

class MealViewSet(viewsets.ModelViewSet):
    serializer_class = MealSerializer

    def get_queryset(self):
        queryset = Meal.objects.all()
        meal_type = self.request.query_params.get('meal_type', None)
        if meal_type is not None:
            queryset = queryset.filter(meal_type=meal_type)
        return queryset
