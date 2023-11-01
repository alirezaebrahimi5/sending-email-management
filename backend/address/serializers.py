from rest_framework.serializers import Serializer, FileField
from rest_framework import serializers
from upload.models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['user']
    