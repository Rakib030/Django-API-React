from rest_framework import serializers
from rest_framework.authtoken.views import Token
from . models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        Token.objects.create(user=user)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UpdateUserSeriailzer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'avatar',  'date_joined',
            'email', 'first_name', 'friends',
            'last_name', 'username'
        ]


class PostSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'id', 'owner','title','description','body','comments','updated','get_created', 'profile'
        ]
    
    def get_profile(self, obj):
        return UserSerializer(obj.owner, many=False).data


class CommentSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = [
            "id", "owner", "profile", "post_select", "body", "updated", "created"
        ]

    def get_profile(self, obj):
        return UserSerializer(obj.owner, many=False).data


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = [
            "id", "owner", "post", "is_liked"
        ]
