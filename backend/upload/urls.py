from django.urls import path, include
from rest_framework import routers
from .views import UploadViewSet, FileList

router = routers.DefaultRouter()
router.register(r'upload', UploadViewSet, basename="upload")

# Wire up our API using automatic URL routing.
urlpatterns = [
    path('', include(router.urls)),
    path('files/', FileList.as_view(), name='files'),
]