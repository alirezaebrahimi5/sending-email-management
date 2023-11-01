from rest_framework.serializers import Serializer, FileField
from rest_framework import serializers
from .models import FileSave
# Serializers define the API representation.
class UploadSerializer(Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']
        
        
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSave
        exclude = ['csv_file']
    