from django.urls import path

from api.views import UpdateUser, UserCreate, UserLogin

urlpatterns = [
    path("user/create/", UserCreate.as_view(), name="User-Create"),
    path("user/login/", UserLogin.as_view(), name="User-Login"),
    path("user/update/", UpdateUser.as_view(), name="Update-User"),
]
