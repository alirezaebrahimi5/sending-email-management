from django.db import models
from user.models import CustomUser as User
import os
import uuid
import string
import random

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join(instance.directory_string_var, filename)

class FileSave(models.Model):
    csv_file = models.FileField(upload_to =get_file_path)
    directory_string_var = id_generator()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.email
    

class Address(models.Model):
    nid = models.CharField(max_length=11, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.email} -> {self.user.email}'
    
