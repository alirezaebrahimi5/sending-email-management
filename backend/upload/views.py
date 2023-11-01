from rest_framework.viewsets import ViewSet
from rest_framework import authentication, permissions
from rest_framework.response import Response
from .serializers import UploadSerializer, FileSerializer
from rest_framework import generics, status
from django.shortcuts import render, redirect
from .forms import CSVImportForm
from .models import Address, FileSave
import csv
# ViewSets define the view behavior.
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
            FileSave.objects.create(
                csv_file = file_uploaded,
                user = request.user
            )
            user = request.user
            for row in file_uploaded:
                nid = row.decode("utf-8").split(",")[0]
                email = row.decode("utf-8").split(",")[1]
                Address.objects.get_or_create(nid=nid, email=email, user=user)
        else:
            response = "wrongType"
        return Response(response)
    
class FileList(generics.ListAPIView):
    model = FileSave
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def get_queryset(self):
        queryset = FileSave.objects.filter(user=self.request.user)
        return queryset
    