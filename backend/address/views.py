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
from rest_framework.pagination import PageNumberPagination
import math
from django.db.models import Q
class ResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
    def get_paginated_response(self, data):
        # if you want to show page size in resposne just add these 2 lines
        if self.request.query_params.get('page_size'):
            self.page_size = int(self.request.query_params.get('page_size'))
            
        # you can count total page from request by total and page_size
        total_page = math.ceil(self.page.paginator.count / self.page_size)
        
        # here is your response
        return Response({
            'count': self.page.paginator.count,
            'total': total_page,
            'page_size': self.page_size,
            'current': self.page.number,
            'previous': self.get_previous_link(),
            'next': self.get_next_link(),
            'results': data
        })
class MyAddress(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        queryset = Address.objects.filter(user=self.request.user)
        return queryset

class MyAddressFilter(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        param = self.request.query_params.get('filtering')
        if param == 'sent':
            queryset = Address.objects.filter(Q(user=self.request.user) & Q(sent=True) & Q(wating=False))
        elif param == 'waiting':
            queryset = Address.objects.filter(Q(user=self.request.user) & Q(wating=True))
        elif param == 'failed':
            queryset = Address.objects.filter(Q(user=self.request.user) & Q(sent=False) & Q(wating=False))
        else:
            queryset = Address.objects.filter(user=self.request.user)
        return queryset
    
class MyAddressSearch(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        param = self.request.query_params.get('search')
        queryset = Address.objects.filter(Q(user=self.request.user) & Q(email__icontains=param) | Q(nid__icontains=param))
        return queryset