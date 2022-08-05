from django.db import models

from recipe.settings import STATIC_URL

# Create your models here.



class detail(models.Model):
	name = models.CharField(max_length=400)
	primary_role = models.CharField(max_length=400)
	state = models.CharField(max_length=80)
	city =  models.CharField(max_length=80)
	bio = models.TextField()
	number = models.CharField(max_length=80)
	email = models.EmailField()
	linkd_url =  models.URLField()
	past_exp = models.TextField()
	add_det = models.TextField()
	status = models.CharField(max_length=80, default='applied')
	resume = models.FileField(upload_to=STATIC_URL, null=True, max_length=255)
