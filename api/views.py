from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from .models import Course, Topic, UserProfile, Video
from .serializes import CourseSerializer, TopicSerializer, UserProfileSerializer, UserSerializer, CoursePostSerializer, VideoSerializer, CourseVideoPostSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction

from django.contrib.auth.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def get_routes(request):
   routes = [
       '/api/token',
       '/api/token/refresh'
   ]
   return Response(routes)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_profile(request):
    user = request.user
    user_profile = user.user
    serializer = UserProfileSerializer(user_profile, many=False)
    return Response(serializer.data)
        
class CourseView(APIView):
    # 1. List all
    def get(self, request, *args, **kwargs):
        courses = Course.objects.select_related('topic').all()

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            data = {
                'name': request.data.get('name'),
                'description': request.data.get('description'),
                'price': request.data.get('price'),
                'topic': request.data.get('topicId'),
            }
            
            course_serializer = CoursePostSerializer(data=data)
            if course_serializer.is_valid():
                
                with transaction.atomic():
                    # save to course table
                    course_serializer.save()

                    ## save video to table
                    print(request.data.get("videoFile"))
                    video_file = request.FILES['videoFile']
                    data = {
                        "caption":None,
                        "video":video_file
                    }
                    # save to video table
                    video_serializer = VideoSerializer(data=data)
                    if video_serializer.is_valid():
                        video_serializer.save()
                    
                    # save to course_video table
                    serializer = CourseVideoPostSerializer(data={"course":course_serializer.data['id'], "video":video_serializer.data['id']})
                    if serializer.is_valid():
                        serializer.save()
                        return Response({ "data": serializer.data }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TopicView(APIView):
    def get(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'),
        }
        serializer = TopicSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    def post(self, request):
        data_user = {
            'email': request.data.get('email'),
            'password': request.data.get('password'),
            'username': request.data.get('username'),
        }
        
        if not (data_user["username"] and data_user["email"] and data_user["password"]):
            return Response({'errors': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Check if user with the specified email already exists
            user = User.objects.get(email=data_user["email"])
            return Response({'errors': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            
            user = User.objects.create_user(username=data_user["username"], email=data_user["email"], password=data_user["password"])

            data_user_profile = {
                'firstname': request.data.get('firstname'),
                'lastname': request.data.get('lastname'),
                'phone': request.data.get('phone')
            }
        
            UserProfile.objects.create(user=user, firstname=data_user_profile["firstname"], lastname=data_user_profile["lastname"], phone=data_user_profile["phone"])
            return Response({"message": "User was created"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'errors': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    def get(self, request):
        user_course_orders = UserProfile.objects.all()

        serializer = UserProfileSerializer(user_course_orders, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, user_id = None):
        user = UserProfile.objects.filter(id=user_id).first()
        if user:
            user.delete()
            return Response({"data":user_id}, status=status.HTTP_200_OK)
        else:
            return Response({"errors":"User not found"}, status=status.HTTP_404_NOT_FOUND)
    