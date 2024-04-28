from django.db import models
from .validators import file_size
from django.core.validators import FileExtensionValidator 

from django.contrib.auth.models import User
# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
        
class Course(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(max_length=500, null=False)
    price = models.IntegerField(null=False)
    topic = models.ForeignKey(Topic, related_name='topic',  on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        ordering = ['id']

class UserProfile(models.Model):
    user = models.OneToOneField(User,related_name='user',  on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100, null=False)
    lastname = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length =26,null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # user_course_orders = models.ManyToManyField(Course, through='UserCourseOrder')

    def __str__(self):
        return f'{self.firstname} - {self.lastname} - {self.user.username} - {self.user.email}'

class UserCourseOrder(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    order_price = models.IntegerField(null=False)

class Video(models.Model):
    caption=models.CharField(max_length=100, null=True)
    video=models.FileField(upload_to="video/%y", validators=[file_size, FileExtensionValidator( ['mov', 'mp4','avi'] )])
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.video)
    
class CourseVideo(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.course} - {self.video}'