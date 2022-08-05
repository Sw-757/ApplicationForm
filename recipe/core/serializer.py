from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from . models import *

class ser(serializers.ModelSerializer):
	class Meta:
		model = detail
		fields = ['id','name', 'primary_role','state','city','bio','number','email','linkd_url','past_exp','add_det','status','resume']

class ser2(serializers.ModelSerializer):
	class Meta:
		model = detail
		fields = ['id','name', 'primary_role','city','email','status']

class ser3(serializers.ModelSerializer):
	class Meta:
		model = detail
		fields = ['resume','name','primary_role','state','city','bio','number','email','linkd_url','past_exp','add_det']

		#'name', 'primary_role','state','city','bio','number','email','linkd_url','past_exp','add_det',