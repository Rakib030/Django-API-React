from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework import status
from . serializers import *


class UserCreate(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserCreateSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            token = Token.objects.get(user__email=request.data.get("email"))
            return Response(token.key, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfile(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        user = User.objects.get(email=request.user.email)
        serializer = UserCreateSerializer(user, many=False)
        post = user.userpost_set.all()
        post_serializer = UserPostSerializer(post, many=True)
        res = {"user_profile": serializer.data, "user_post": post_serializer.data}
        return Response(res, status=status.HTTP_200_OK)


class LoginPage(APIView):
    def post(self, request, format=None):
        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            try:
                token = Token.objects.get(user=user)
            except: 
                token = Token.objects.create(user=user)
            return Response(token.key)
        else:
            return Response("Not found", status=status.HTTP_404_NOT_FOUND)


class UpdateUser(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserCreateSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def put(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class UserPostView(APIView):
    def get(self, request):
        post = UserPost.objects.all()
        serializer = UserPostSerializer(post, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class PostComment(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    def get(self, request, pk):
        post = UserPost.objects.get(id=pk)
        post_comment = post.comment_set.all()
        post_comment_serializer = CommentSerializer(post_comment, many=True)
        data = {"comments": post_comment_serializer.data}
        return Response(data, status=status.HTTP_200_OK)
    
    def post(self, request, pk):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class React(APIView):
    def get(self, request, pk):
        post = UserPost.objects.get(id=pk)
        post.react -= int(request.data.get("react"))
        post.save()
        return Response(str(post.react), status=status.HTTP_202_ACCEPTED)
        
    def post(self, request, pk):
        post = UserPost.objects.get(id=pk)
        post.react += int(request.data.get("react"))
        post.save()
        return Response(str(post.react), status=status.HTTP_202_ACCEPTED)
