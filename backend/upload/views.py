from rest_framework.viewsets import ViewSet
from rest_framework import authentication, permissions
from rest_framework.response import Response
from .serializers import UploadSerializer
from rest_framework import generics, status
from django.shortcuts import render, redirect
from .forms import CSVImportForm
from .models import Address
import csv
from rest_framework.pagination import PageNumberPagination
import math
class ResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 20
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
class UploadViewSet(ViewSet):
    serializer_class = UploadSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def list(self, request):
        return Response("GET API")

    def create(self, request):
        file_uploaded = request.FILES.get('file')
        content_type = file_uploaded.content_type
        if content_type == 'text/csv':
            response = "ok"
            user = request.user
            for row in file_uploaded:
                nid = row.decode("utf-8").split(",")[0]
                email = row.decode("utf-8").split(",")[1]
                Address.objects.get_or_create(nid=nid, email=email, user=user)
        else:
            response = "wrongType"
        return Response(response)
