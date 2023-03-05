from django.contrib import admin
from .models import Meal, Log, Favorites

admin.site.register(Meal)
admin.site.register(Log)
admin.site.register(Favorites)