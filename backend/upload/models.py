from django.db import models
from user.models import CustomUser as User
import os
import uuid
import string
import random

def id_generator(size=12, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join(instance.directory_string_var, filename)

class FileSave(models.Model):
    csv_file = models.FileField(upload_to =get_file_path)
    directory_string_var = id_generator()
    title = models.CharField(max_length=256, default=id_generator, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.email
    

class Address(models.Model):
    nid = models.CharField(max_length=11, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sent = models.BooleanField(default=False)
    last_sent = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        unique_together = ('nid', 'user', 'email')
        
    def __str__(self):
        return f'{self.email} -> {self.user.email}'
    
