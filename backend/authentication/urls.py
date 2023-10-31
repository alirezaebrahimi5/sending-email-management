from django.urls import path
from .views import MyObtainTokenPairView, ProfileView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('profile/', ProfileView.as_view()),
    path('register/', RegisterView.as_view(), name='auth_register'),
]