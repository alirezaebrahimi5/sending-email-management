from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .serializers import UploadSerializer

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
        else:
            response = "wrongType"
        return Response(response)