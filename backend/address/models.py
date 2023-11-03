from django.db import models
from user.models import CustomUser as User
# Create your models here.
class Data(models.Model):
    taskId = models.CharField(max_length=200, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.user.email} = {self.taskId}'