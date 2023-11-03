from rest_framework import permissions
from rest_framework.response import Response
from .serializers import *
from rest_framework import generics, status
from .models import *
from upload.models import Address
from rest_framework.pagination import PageNumberPagination
import math
from django.db.models import Q
from time import sleep
from rest_framework.views import APIView
from django.core.mail import EmailMessage
import concurrent.futures
from celery import shared_task
from celery_progress.backend import ProgressRecorder
import os
from backend.celery import app as myapp
from itertools import repeat
class ResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
    def get_paginated_response(self, data):
        # if you want to show page size in resposne just add these 2 lines
        if self.request.query_params.get('page_size'):
            self.page_size = int(self.request.query_params.get('page_size'))
            
        # you can count total page from request by total and page_size
        total_page = math.ceil(self.page.paginator.count / self.page_size)
        
        # here is your response
        return Response({
            'count': self.page.paginator.count,
            'total': total_page,
            'page_size': self.page_size,
            'current': self.page.number,
            'previous': self.get_previous_link(),
            'next': self.get_next_link(),
            'results': data
        })
class MyAddress(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        queryset = Address.objects.filter(user=self.request.user)
        return queryset

class MyAddressFilter(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        param = self.request.query_params.get('filtering')
        if param == 'sent':
            queryset = Address.objects.filter(Q(user=self.request.user) & Q(sent=True) & Q(wating=False))
        elif param == 'waiting':
            queryset = Address.objects.filter(Q(user=self.request.user) & Q(wating=True))
        elif param == 'failed':
            queryset = Address.objects.filter(Q(user=self.request.user) & Q(sent=False) & Q(wating=False))
        else:
            queryset = Address.objects.filter(user=self.request.user)
        return queryset
    
class MyAddressSearch(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        param = self.request.query_params.get('search')
        queryset = Address.objects.filter(Q(user=self.request.user) & Q(email__icontains=param) | Q(nid__icontains=param))
        return queryset
    

class startMail(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        address = Address.objects.filter(Q(user=request.user) & Q(sent=False)).values_list()
        
        user_template,_ = Template.objects.get_or_create(user=request.user)
        
        template = [request.user.email, user_template.subject, user_template.body]
        
        n_data = len(address)
        if n_data%10 == 0:
            n_batche = n_data//1
        else:
            n_batche = n_data//1 +1
            
        data = self.split_list(address, wanted_parts=n_batche)
        
        try:
            old_data = Data.objects.get(user=request.user)
            myapp.control.revoke(old_data.taskId, terminate=True)
            old_data.delete()
        except Data.DoesNotExist:
            pass
        task = celery_function.delay(data, template)

        Data.objects.get_or_create(user=request.user, taskId=task.id)
        return Response(task.id)
         

    
    @staticmethod
    def split_list(alist, wanted_parts=10):
        length = len(alist)
        return [ alist[i*length // wanted_parts: (i+1)*length // wanted_parts] 
                for i in range(wanted_parts) ]

def send_mail(arr, template):
    from_email, subject, body = template
    nid, email, user_id, = arr[1], arr[2], arr[3]
    Address.objects.filter(Q(nid=nid) & Q(email=email) & Q(user__id=user_id)).update(wating=False,sent=True)
    message = body.format(nid= nid, email= email)
    email = EmailMessage(subject, message, from_email, [email])
    "email.send()"
    sleep(2)
    print("Ok!")
    
@shared_task(bind=True)
def celery_function(self, data, template):
    progress_recorder = ProgressRecorder(self)
    result = 0
    for i in range(len(data)):
        with concurrent.futures.ThreadPoolExecutor(10) as executor:
            executor.map(send_mail, data[i], repeat(template))
        result += 1
        progress_recorder.set_progress(result + 1, len(data))
    return result


class stopMail(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        task_id = self.request.query_params.get('task_id')
        print(task_id)
        data = Data.objects.get(user=request.user)
        myapp.control.revoke(task_id, terminate=True)
        data.remove()
        return Response(status=status.HTTP_200_OK)


class TemplateView(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        template = Template.objects.get_or_create(user=request.user)
        
        return Response({'subject':template.subject, 'body':template.body})