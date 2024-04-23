from django.db import models
# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']

class Course(models.Model):
    name = models.CharField(max_length=100, default="")
    description = models.TextField(max_length=500, default="")
    price = models.IntegerField()
    topic_id = models.ForeignKey(Topic, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'ID: {self.id} | Name: {self.name}'

    class Meta:
        ordering = ['id']


# class User(models.Model):

# class Video(models.Model):
#
#
# class
