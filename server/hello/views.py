from django.shortcuts import render
from django.http import HttpResponse
import requests
import json

from .models import Greeting


tasks = [
    {
        'id': 1,
        'name': u'Polygon',
        'description': u'Site selection app'

    },
    {
        'id': 3,
        'name': u'Polygon2.0',
        'description': u'intelligent Site selection app'

    }
]
# Create your views here.
def index(request):
    return HttpResponse(json.dumps({"tasks": tasks}))


def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})
