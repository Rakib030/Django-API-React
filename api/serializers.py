from rest_framework import serializers
from rest_framework.authtoken.views import Token
from . models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        Token.objects.create(user=user)
        user.save()
        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
        "id", "last_login", 
        "is_superuser", "username", "first_name", "last_name", 
        "is_staff", "is_active", "date_joined", "avatar", "email", 
        "bio", "groups", "user_permissions"
        ]