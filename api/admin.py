from django.contrib import admin
from .models import Course, Topic, UserProfile, UserCourseOrder, Video, CourseVideo

class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description','price','topic_id']
class TopicAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

class UserAdmin(admin.ModelAdmin):
    list_display = ['id','firstname','lastname','phone','user','created_at']

class UserCourseOrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'course','user','order_price']
    
class VideoAdmin(admin.ModelAdmin):
    list_display = ['id', 'caption','video', 'created_at']

class CourseVideoAdmin(admin.ModelAdmin):
    list_display = ['id', 'course','video', 'created_at']

admin.site.register(Course, CourseAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(UserProfile, UserAdmin)
admin.site.register(UserCourseOrder, UserCourseOrderAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(CourseVideo, CourseVideoAdmin)

# Register your models here.
