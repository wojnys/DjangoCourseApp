from rest_framework import serializers
from .models import Course, Topic, UserProfile, UserCourseOrder, Video, CourseVideo
from django.contrib.auth.models import User

# This is higher model from django, not created by wojnys
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email','password')
        
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'name')


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 'caption', 'video', 'created_at')
class CourseVideoPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields=('course', 'video')
        
class CourseVideoSerializer(serializers.ModelSerializer):
    video = VideoSerializer()
    
    class Meta:
        model = CourseVideo
        fields = ('video', 'created_at')

class CourseSerializer(serializers.ModelSerializer):
    topic = TopicSerializer()
    videos = CourseVideoSerializer(many=True, source='coursevideo_set')
    
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'price', 'topic', 'created_at', 'videos')

        
class CoursePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'price', 'topic')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = UserProfile
        fields = ('user', 'firstname', 'lastname', 'phone')

class UserCourseOrderSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    user = UserProfileSerializer()
    class Meta:
        model = UserCourseOrder
        fields = ('id','course', 'user', 'order_price')

class UserCourseOrderPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourseOrder
        fields = ('course', 'user', 'order_price')
        
    

