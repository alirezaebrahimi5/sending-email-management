from django.db import models


class Address(models.Model):
    nationalID = models.CharField(max_length=11, blank=False, null=False)
    emailAdd = models.EmailField(blank=False, null=False)
    
