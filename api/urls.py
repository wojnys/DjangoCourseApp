from django.urls import path
from .views import CourseView, TopicView, UserProfileView, get_routes, MyTokenObtainPairView, get_profile
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('course', CourseView.as_view()),
    path('topic', TopicView.as_view()),
    path('user', UserProfileView.as_view()),
    path('user/<int:user_id>', UserProfileView.as_view()),
    path('',get_routes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-profile/', get_profile),
]