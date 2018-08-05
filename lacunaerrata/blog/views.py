from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.

def index(request):
    template = loader.get_template('blog/index.html')
    return HttpResponse(template.render({}, request))

def about(request):
	template = loader.get_template('blog/about.html')
	return HttpResponse(template.render({}, request))




