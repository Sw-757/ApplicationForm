# Generated by Django 4.0.6 on 2022-08-04 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_detail_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='detail',
            name='resume',
            field=models.FileField(max_length=255, null=True, upload_to='resume/'),
        ),
        migrations.DeleteModel(
            name='resume',
        ),
    ]