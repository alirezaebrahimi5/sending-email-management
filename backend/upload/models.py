from django.db import models
from user.models import CustomUser as User

class Address(models.Model):
    nid = models.CharField(max_length=11, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sent = models.BooleanField(default=False)
    wating = models.BooleanField(default=True)
    last_sent = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        unique_together = ('nid', 'user', 'email')
        
    def __str__(self):
        return f'{self.email} -> {self.user.email}'
    
