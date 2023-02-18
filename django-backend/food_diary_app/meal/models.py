from django.db import models

# Create your models here.
class Meal(models.Model):
    MEAL_TYPE_CHOICES = (
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Snack', 'Snack'),
    )

    meal_name = models.CharField(max_length=300)
    meal_type = models.CharField(
        choices=MEAL_TYPE_CHOICES,
        max_length=20,
    )
    protein_amount = models.DecimalField(max_digits=5, decimal_places=1)
    fat_amount = models.DecimalField(max_digits=5, decimal_places=1)
    carbs_amount = models.DecimalField(max_digits=5, decimal_places=1)
    calories = models.IntegerField()

    def __str__(self):
        return self.name
