from django.urls import path
from .views import *
# Wire up our API using automatic URL routing.
urlpatterns = [
    path('address/', MyAddress.as_view(), name='files'),
]