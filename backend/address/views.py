from rest_framework.viewsets import ViewSet
from rest_framework import authentication, permissions
from rest_framework.response import Response
from .serializers import *
from rest_framework import generics, status
from django.shortcuts import render, redirect
from .models import *
from upload.models import Address
import csv
import pandas as pd

class MyAddress(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def get_queryset(self):
        queryset = Address.objects.filter(user=self.request.user)
        return queryset
    