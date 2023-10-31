
from rest_framework import serializers

from user.models import CustomUser as User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['email'] = user.email
        return token
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'email',
        ]
        