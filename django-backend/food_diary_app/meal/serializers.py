from .models import Meal, Log, Favorite
from rest_framework import serializers
from django.contrib.auth import get_user_model
import requests
import os

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
        meal_data["meal_image"]  = get_meal_image(meal_data["meal_name"])
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
        meal_data["meal_image"]  = get_meal_image(meal_data["meal_name"])
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


def get_meal_image(meal_name):
    API_ENDPOINT_URL = "https://api.edamam.com/api/food-database/v2/parser"
    params = {
        "app_id": os.environ['APP_ID'],
        "app_key": os.environ['APP_KEY'],
        "ingr": meal_name
    }
    response = requests.get(API_ENDPOINT_URL, params=params)

    image = os.environ['DEFAULT_MEAL_IMAGE_URL']
    if (len(response.json()["parsed"])!=0):
        image = response.json()["parsed"][0]["food"]["image"]
    return image
