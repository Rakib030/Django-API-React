from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime


class User(AbstractUser):
    avatar = models.ImageField(default="avatar.svg", null=True, blank=True, upload_to="profile/")
    email = models.EmailField(unique=True, null=True)
    friends = models.ManyToManyField("User", blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=1000, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    body = models.ImageField(upload_to="post/", blank=True, null=True)
    comments = models.ManyToManyField("Comment", blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created"]

    def get_created(self):
        time = datetime.now()
        if self.created.day == time.day:
            hour = (time.hour - self.created.hour)
            return str(hour) + " hours ago"
        else:
            if self.created.month == time.month:
                return str(time.day - self.created.day) + " days ago"

        return abs(self.created)

    def __str__(self):
        return f"{self.title[0:10]}..."


class Comment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post_select = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:10]


class Like(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    is_liked = models.BooleanField(default=False)

    def __str__(self):
        return self.post.title[0:10]