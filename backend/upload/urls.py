from django.urls import path, include, re_path
from rest_framework import routers
from .views import UploadViewSet, DeleteAddress, DeleteAll

router = routers.DefaultRouter()
router.register(r'upload', UploadViewSet, basename="upload")

# Wire up our API using automatic URL routing.
urlpatterns = [
    path('', include(router.urls)),
    path('delete/', DeleteAddress.as_view(), name='delete'),
    path('delete_all/', DeleteAll.as_view(), name='delete_all'),
    re_path(r'^celery-progress/', include('celery_progress.urls')),

]