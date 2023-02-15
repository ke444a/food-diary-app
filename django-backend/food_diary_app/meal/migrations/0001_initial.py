# Generated by Django 4.1.6 on 2023-02-07 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('protein_amount', models.DecimalField(decimal_places=1, max_digits=5)),
                ('fat_amount', models.DecimalField(decimal_places=1, max_digits=5)),
                ('carbs_amount', models.DecimalField(decimal_places=1, max_digits=5)),
                ('calories', models.IntegerField()),
            ],
        ),
    ]
