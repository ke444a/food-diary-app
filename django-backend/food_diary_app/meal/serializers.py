from .models import Meal, Log, Favorite
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'

class LogSerializer(serializers.ModelSerializer):
    meal  = MealSerializer()

    class Meta:
        model = Log
        fields = '__all__'

    def create(self, validated_data):
        meal_data = validated_data.pop('meal')
        date = validated_data.pop('date')
        meal_serializer = MealSerializer(data=meal_data)
        meal_serializer.is_valid(raise_exception=True)
        meal = meal_serializer.save()
        log = Log.objects.create(meal=meal, date=date, **validated_data)
        return log
    
class FavoriteSerializer(serializers.ModelSerializer):
    meal = MealSerializer()

    class Meta:
        model = Favorite
        fields = '__all__'

    def create(self, validated_data):
        meal_data = validated_data.pop('meal')
        meal_serializer = MealSerializer(data=meal_data)
        meal_serializer.is_valid(raise_exception=True)
        meal = meal_serializer.save()
        favorite = Favorite.objects.create(meal=meal, **validated_data)
        return favorite

    def update(self, instance, validated_data):
        meal_data = validated_data.pop('meal')
        meal_serializer = MealSerializer(instance=instance.meal, data=meal_data)
        meal_serializer.is_valid(raise_exception=True)
        meal_serializer.save()
        return super().update(instance, validated_data)