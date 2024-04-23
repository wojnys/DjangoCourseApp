from django.urls import path
from .views import CourseView, TopicView

urlpatterns = [
    path('course', CourseView.as_view()),
    path('topic', TopicView.as_view())
]