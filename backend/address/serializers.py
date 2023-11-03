from rest_framework.serializers import Serializer, FileField
from rest_framework import serializers
from upload.models import Address
from .models import Data
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['user']
    
class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'
    