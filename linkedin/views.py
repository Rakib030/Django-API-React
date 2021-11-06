from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.views import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from . serializers import *


class UserView(APIView):
    def post(self, *args, **kwargs):
        serializer = UserSerializer(data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if Token.objects.filter(user=user).exists():
                token = Token.objects.get(user=user).key
            else:
                token = Token.objects.create(user=user).key
            return Response(token, status=status.HTTP_200_OK)
        else:
            return Response("user doesn't exist", status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    def get(self, request):
        serializer = UserSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateUser(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    def post(self, request):
        user = request.user
        print(request.user)
        serializer = UpdateUserSeriailzer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class PostView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    def get(self, request):
        post = Post.objects.all()
        serializer = PostSerializer(post, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class PostComment(APIView):
    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        comment = post.comment_set.all()
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class PostLike(APIView):

    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        like = post.like_set.filter(is_liked=True).count()
        try:
            if_liked = post.like_set.get(post=post, owner=request.user)
            is_like = if_liked.is_liked
        except:
            if_liked = Like.objects.create(post=post, owner=request.user)
            is_like = if_liked.is_liked
        data={"is_liked": like, "is_like": is_like}
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        post = Post.objects.get(id=pk)
        try:
            like = post.like_set.get(post=post, owner=request.user)
            if like.is_liked:
                like.is_liked = False
                like.save()
                return Response(status=status.HTTP_200_OK)
            else:
                like.is_liked = True
                like.save()
                return Response(status=status.HTTP_200_OK)
        except:
            owner = request.user
            like = Like.objects.create(post=post, owner=owner, is_liked=True)
            return Response(status=status.HTTP_200_OK)