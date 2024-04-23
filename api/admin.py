from django.contrib import admin
from .models import Course, Topic

class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description','price','topic_id']
class TopicAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

admin.site.register(Course, CourseAdmin)
admin.site.register(Topic, TopicAdmin)

# Register your models here.
