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

class CourseSerializer(serializers.ModelSerializer):
    topic = TopicSerializer()  # Nested serializer for the related Topic object

    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'price', 'topic')
        
class CoursePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'price', 'topic')

class UserProfileSerializer(serializers.ModelSerializer):
    # user_course_orders  = UserCourseOrderSerializer(many=True, source='usercourseorder_set')
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = UserProfile
        fields = ('user', 'firstname', 'lastname', 'phone')

class UserCourseOrderSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Assuming User model exists
    user = UserProfileSerializer()
    class Meta:
        model = UserCourseOrder
        fields = ('course', 'user', 'order_price')

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','caption', 'video')
    
class CourseVideoPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseVideo
        fields=('course', 'video')
            
class CourseVideoSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    video = VideoSerializer()
    class Meta:
        model = CourseVideo
        fields=('course', 'video')


