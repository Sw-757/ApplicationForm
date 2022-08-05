from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json
from django.http import JsonResponse
from django.http import FileResponse
import os
# Create your views here.

class ReactView(APIView):
	
	serializer_class = ser

	def get(self, request):
		l = [] 
		for a in detail.objects.all():
			serializer = ser2(a)
			data1 = json.dumps(serializer.data)
			data2 = json.loads(data1)
			l.append(data2)
		return Response(l)

	def post(self, request):
		print(request.data)
		serializer = ser3(data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(serializer.data)


class nextView(APIView):
	def post(self, request):
		data=request.data
		print(data['status'])
		some = data['id']
		detail.objects.filter(id = some).update(status = data['status'])
		return Response(True)

def nextbetterView(request,user_id):
	print(user_id)
	a = detail.objects.filter(id=user_id)
	serializer = ser(a[0])	
	data1 = json.dumps(serializer.data)
	data2 = json.loads(data1)
	return JsonResponse(data2)


def nextbetterView2(request,user_id):
	
	a = detail.objects.filter(id=user_id)
	serializer = ser(a[0])	
	data1 = json.dumps(serializer.data)
	data2 = json.loads(data1)
	return FileResponse(open(r'C:\Users\91704\OneDrive\Desktop\ishipnca\recipe\static\FSD_Assignment.pdf', 'rb'), content_type='application/pdf')