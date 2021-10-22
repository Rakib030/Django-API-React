from django.http import request
from rest_framework import serializers
from rest_framework.authtoken.views import Token
from . models import *


class UserCreateSerializer(serializers.ModelSerializer):
    friend = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            'avatar',
            'bio', 'cover_avatar', 'date_joined',
            'email', 'first_name', 'friends',
            'groups', 'id', 'is_active',
            'is_staff', 'is_superuser', 'last_login',
            'last_name', 'name', 'user_permissions',
            'username', 'password', 'friend'
        ]
        extra_kwargs = {'password': {'write_only': True, }}

    def get_friend(self, obj):
        return UserCreateSerializer(obj.friends.all(), many=True).data

    def create(self, validated_data):
        user = User (username=validated_data.get("username"), email=validated_data.get("email"))
        user.set_password(validated_data.get("password"))
        user.name = validated_data["username"]
        user.save()
        Token.objects.create(user=user)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'bio',
            'avatar',
            'cover_avatar',
            'friends',
        ]
    


class UserPostSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = UserPost
        fields = [
            'id',
            'user', 
            'profile', 
            'title', 
            'post', 
            'react', 
            'comments', 
            'updated', 
            'get_created'
        ]

    def get_profile(self, obj):
        return UserCreateSerializer(obj.user, many=False).data



class CommentSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'profile',
            'userpost',
            'body',
            'updated',
            'created'
        ]
    def get_profile(self, obj):
        return UserCreateSerializer(obj.user, many=False).data