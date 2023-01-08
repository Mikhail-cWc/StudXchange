# Generated by Django 4.1.3 on 2022-11-29 22:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_category_task_remove_university_task_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tasks', to='api.category'),
        ),
        migrations.AlterField(
            model_name='task',
            name='university',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='tasks', to='api.university'),
        ),
    ]