from rest_framework.serializers import Serializer, FileField
from rest_framework import serializers
# Serializers define the API representation.
class UploadSerializer(Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']