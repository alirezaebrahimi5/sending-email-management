from . import serializers
from rest_framework import generics, status
from rest_framework.views import APIView
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from user.models import CustomUser as User
from rest_framework.response import Response


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class ProfileView(generics.RetrieveAPIView):
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class ResetView(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):  
        password = self.request.query_params.get('password')
        password2 = self.request.query_params.get('password2')
        user = User.objects.get(id=request.user.id)
        if password == password2:
            user.set_password(password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    