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
import time


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
    
class SendMail():
    def __init__(self,template):
        self._from_address = 'my_email_address'
        self.template = template

    def buildmessage(self, address, **kwargs):
        self.sendmail(address)

    @staticmethod
    def sendmail(message):
        sleep(5)
            #email = EmailMessage(subject, html_content, from_email, [to])
            #email.send()
        print("Ok!")
                    

class startMail(APIView):
    
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        address = Address.objects.filter(Q(user=request.user) & Q(sent=False)).values_list()
        template = ''
        

        data = self.split_list(address)
        task = celery_function.delay(template, data)

        Data.objects.get_or_create(user=request.user, taskId=task.id)
        return Response(task.id)
         

    
    @staticmethod
    def split_list(alist, wanted_parts=10):
        length = len(alist)
        return [ alist[i*length // wanted_parts: (i+1)*length // wanted_parts] 
                for i in range(wanted_parts) ]

def send_mail(arr):
    sleep(1)
    nid, email, user_id, = arr[0][1], arr[0][2], arr[0][3]

    add = Address.objects.filter(Q(nid=nid) & Q(email=email) & Q(user__id=user_id)).update(wating=False,sent=True)
    
    #email = EmailMessage(subject, html_content, from_email, [to])
    #email.send()
    print("Ok!")
    
@shared_task(bind=True)
def celery_function(self, template, data):
    email = template
    progress_recorder = ProgressRecorder(self)
    result = 0
    for i in data:
        with concurrent.futures.ThreadPoolExecutor(10) as executor:
            executor.map(send_mail, data)
        result += 1
        progress_recorder.set_progress(result + 1, len(data))
    return result
