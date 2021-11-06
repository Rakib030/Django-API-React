from django.urls import path
from . views import *

urlpatterns = [
    path("user/", UserView.as_view(), name="user"),
    path("user/login/", UserLogin.as_view(), name="user-login"),
    path("user/profile/", ProfileView.as_view(), name="user-profile"),
    path("user/update/", UpdateUser.as_view(), name="user-update"),
    path("user/post/", PostView.as_view(), name="post"),
    path("user/post/comment/<int:pk>/", PostComment.as_view(), name="post-comment"),
    path("user/post/like/<int:pk>/", PostLike.as_view(), name="post-like"),
]
