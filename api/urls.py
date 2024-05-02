from django.urls import path
from .views import CourseView, TopicView, UserProfileView, get_routes, MyTokenObtainPairView, get_profile
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('course', CourseView.as_view({'get': 'get_all', 'post': 'post_create_course'})),
    path('course/<int:course_id>', CourseView.as_view({'get': 'get_detail'})),
    path('course/<int:course_id>/user/<int:user_id>/create-order', CourseView.as_view({'post': 'post_create_course_order'})),
    path('topic', TopicView.as_view({'get': 'get_all',  'post': 'post_create_topic'})),
    path('topic/<int:topic_id>', TopicView.as_view({'get': 'get_topic_detail',  'put': 'update_topic'})),
    path('user', UserProfileView.as_view({'get': 'get_all', 'post': 'post_create_user'})),
    path('user/<int:user_id>', UserProfileView.as_view({'delete': 'delete_user'})),
    path('user/<int:user_id>/all-orders', UserProfileView.as_view({'get': 'get_all_orders'})),
    path('user/<int:user_id>/order/<int:order_id>/detail', UserProfileView.as_view({'get': 'get_order_detail'})),
    path('user/<int:user_id>/update', UserProfileView.as_view({'put': 'update_user_profile'})),
    path('',get_routes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-profile/', get_profile),
]