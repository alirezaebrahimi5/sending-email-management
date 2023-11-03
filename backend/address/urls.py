from django.urls import path
from .views import *
# Wire up our API using automatic URL routing.
urlpatterns = [
    path('address/', MyAddress.as_view(), name='files'),
    path('address_filter/', MyAddressFilter.as_view(), name='files-filter'),
    path('address_search/', MyAddressSearch.as_view(), name='files-search'),
    path('start_mail/', startMail.as_view(), name='start_mail'),
    path('stop_mail/', stopMail.as_view(), name='stop_mail'),

]