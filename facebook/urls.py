from django.urls import path
from . views import *

urlpatterns = [
    path('user/', UserCreate.as_view(), name="user"),
    path('user/profile/', UserProfile.as_view(), name="profile"),
    path('update-get/user/<int:pk>/', UpdateUser.as_view(), name="update-user"),
    path('login/', LoginPage.as_view(), name="login"),
    path('post/', UserPostView.as_view(), name="user-post"),
    path('post/react/<int:pk>/', React.as_view(), name="react"),
    path('post/comments/<int:pk>/', PostComment.as_view(), name="post-comment"),
]
