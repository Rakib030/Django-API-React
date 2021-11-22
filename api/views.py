from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework import status
from . serializers import *


class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request):
        username = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            if Token.objects.filter(user=user).exists():
                token = Token.objects.get(user=user)
            else:
                token = Token.objects.create(user=user)
            return Response({f"key: {token.key}"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUser(APIView):
    permission_classes = (IsAuthenticated,)
    authenticate_classes = (TokenAuthentication,)
    def post(self, request):
        user = request.user
        serializer = UpdateUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages , status=status.HTTP_400_BAD_REQUEST)