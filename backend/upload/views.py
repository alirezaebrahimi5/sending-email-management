from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .serializers import UploadSerializer

from django.shortcuts import render, redirect
from .forms import CSVImportForm
from .models import Address, FileSave
import csv
# ViewSets define the view behavior.
class UploadViewSet(ViewSet):
    serializer_class = UploadSerializer

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
        else:
            response = "wrongType"
        return Response(response)
    
"""
def import_csv(file):
    form = CSVImportForm(file)
    if form.is_valid():
        csv_file = file.read().decode('utf-8').splitlines()
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
            Address.objects.create(
                    nid=row['id'],
                    email=row['email'],
                )
            Response = ''
            return Response(response)
    else:
        return Response(response)

    return Response(response)"""