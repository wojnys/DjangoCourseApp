from django.contrib import admin
from .models import Course, Topic, UserProfile, UserCourseOrder

class CourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description','price','topic_id']
class TopicAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

class UserAdmin(admin.ModelAdmin):
    list_display = ['id','firstname','lastname','phone','user','created_at']

class UserCourseOrderAdmin(admin.ModelAdmin):
    list_display = ['course','user','order_price']

admin.site.register(Course, CourseAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(UserProfile, UserAdmin)
admin.site.register(UserCourseOrder, UserCourseOrderAdmin)

# Register your models here.
