from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class Meal(models.Model):
    meal_name = models.CharField(max_length=300)
    meal_image = models.URLField(null=True, blank=True)
    protein_amount = models.DecimalField(max_digits=5, decimal_places=1)
    fat_amount = models.DecimalField(max_digits=5, decimal_places=1)
    carbs_amount = models.DecimalField(max_digits=5, decimal_places=1)
    calories = models.PositiveIntegerField()

    def __str__(self):
        return self.meal_name


class Log(models.Model):
    MEAL_TYPE_CHOICES = (
        ('BREAKFAST', 'Breakfast'),
        ('LUNCH', 'Lunch'),
        ('DINNER', 'Dinner'),
        ('SNACK', 'Snack'),
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='logs',
    )
    meal = models.ForeignKey(
        Meal,
        on_delete=models.CASCADE,
        related_name='meals',
    )
    meal_type = models.CharField(
        choices=MEAL_TYPE_CHOICES,
        max_length=20,
    )
    date = models.DateField()

    def __str__(self):
        return f'{self.user.email} - {self.date}'


class Favorite(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='favorites',
    )
    meal = models.ForeignKey(
        Meal,
        on_delete=models.CASCADE,
        related_name='favorites',
    )
    serving_size = models.CharField(blank=True, null=True, max_length=100)
    serving_weight = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.email} - {self.meal.meal_name}'