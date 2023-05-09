from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Note(models.Model) :
    user = models.ForeignKey(User , on_delete=models.CASCADE , null=True)
    message = models.TextField(default="" , max_length=20000)
    time = models.DateTimeField(auto_now_add=True)
    public = models.BooleanField(default=True)
    

