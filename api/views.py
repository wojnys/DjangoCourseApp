from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from .models import Course, Topic, UserProfile, Video
from .serializes import *
from rest_framework import viewsets
from rest_framework.decorators import action

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
        
class CourseView(viewsets.ViewSet):
    # 1. List all
    @action(detail=False, methods=['get'])
    def get_all(self, request, *args, **kwargs):
        courses = Course.objects.select_related('topic').all()

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    # GET DETAIL
    @action(detail=True, methods=['get'])
    def get_detail(self, request, course_id = None):
        try:
            course = Course.objects.get(id=course_id)
            serializer = CourseSerializer(course)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

    # POST create order
    @action(detail=False, methods=['post'])
    def post_create_course_order(self, request, course_id = None, user_id = None):
        try:
            course = Course.objects.get(id=course_id)
            user_profile = UserProfile.objects.get(user=user_id)
            print(user_profile.id)
            data = {
                'course': course_id,
                'user': user_profile.id,
                'order_price': course.price
            }
            order_serializer = UserCourseOrderPostSerializer(data=data)
            if order_serializer.is_valid():
                order_serializer.save()
                return Response({"data":order_serializer.data, "message":"Sucessfuly purchased"}, status=status.HTTP_201_CREATED)
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Course.DoesNotExist:
            return Response({'errors': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
    # POST reate course
    @transaction.atomic
    @action(detail=False, methods=['post'])
    def post_create_course(self, request, *args, **kwargs):
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
        
    

class TopicView(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def get_all(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def post_create_topic(self, request, *args, **kwargs):
        data = {
            'name': request.data.get('name'),
        }
        serializer = TopicSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def get_topic_detail(self, request, topic_id = None):
        try:
            topic = Topic.objects.get(pk=topic_id)
            serializer = TopicSerializer(topic)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errors': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['put'])
    def update_topic(self, request, topic_id=None):
        try:
            data = {
                "name": request.data.get("name")
            }
            Topic.objects.filter(pk=topic_id).update(name=data["name"])
            updated_topic = Topic.objects.get(id=topic_id)
            serializer = TopicSerializer(updated_topic)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'errors': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class UserProfileView(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def post_create_user(self, request):
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
    
    @action(detail=False, methods=['get'])
    def get_all(self, request):
        user_course_orders = UserProfile.objects.all()

        serializer = UserProfileSerializer(user_course_orders, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_all_orders(self, request, user_id = None):
        try:
            user = UserProfile.objects.get(user=user_id)
            orders = UserCourseOrder.objects.filter(user=user.id)
            serializer = UserCourseOrderSerializer(orders, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errors': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=False, methods=['get'])
    def get_order_detail(self, request, user_id=None, order_id=None):
        try:
            user = UserProfile.objects.get(user=user_id)
            order = UserCourseOrder.objects.get(pk = order_id, user=user.id)
            print(order)
            serializers = UserCourseOrderSerializer(order)
            return Response({"data": serializers.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errors': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
    
    @action(detail=False, methods=['put'])
    def update_user_profile(self, request, user_id=None):
        try:
            data = {
                "firstname": request.data.get("firstname"),
                "lastname": request.data.get("lastname"),
                "phone": request.data.get("phone")
            }
            UserProfile.objects.filter(user_id=user_id).update(firstname=data["firstname"], lastname=data["lastname"], phone=data["phone"])
            updated_user = UserProfile.objects.get(user_id=user_id)
            serializer = UserProfileSerializer(updated_user)
            return Response({"message": "User profile updated", "data":serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'errors': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['delete'])
    def delete_user(self, request, user_id = None):
        user = UserProfile.objects.filter(id=user_id).first()
        if user:
            user.delete()
            return Response({"data":user_id}, status=status.HTTP_200_OK)
        else:
            return Response({"errors":"User not found"}, status=status.HTTP_404_NOT_FOUND)
    