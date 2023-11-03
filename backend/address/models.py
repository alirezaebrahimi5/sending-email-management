from django.db import models
from user.models import CustomUser as User
# Create your models here.
class Data(models.Model):
    taskId = models.CharField(max_length=200, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.user.email} = {self.taskId}'
    
    
class Template(models.Model):

    subject = models.CharField(max_length=256, blank=True, default='blank')
    body = models.TextField(max_length=1024, blank=True, default="{email} your national id is {nid}")
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.user.email} -> {self.subject}'