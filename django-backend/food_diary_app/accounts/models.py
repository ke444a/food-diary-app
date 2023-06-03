from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

def upload_to(instance, filename):
    user_email = instance.email.split('@')[0].replace('.', '-')
    ext = filename.split('.')[-1]
    uploaded_filename = f'{user_email}.{ext}'
    return f'profile_images/{uploaded_filename}'

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    calories_goal = models.IntegerField(default=2000)
    profile_img = models.ImageField(upload_to=upload_to, default='profile_images/default.webp')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = 'auth_user'
