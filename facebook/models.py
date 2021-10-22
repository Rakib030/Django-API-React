from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime


class User(AbstractUser):
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    friends = models.ManyToManyField("User", blank=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(default="images/avatar.svg", upload_to="profile/")
    cover_avatar = models.ImageField(default="images/avatar.svg", upload_to="cover/")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    

class UserPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(blank=True, null=True)
    post = models.ImageField(upload_to="post/")
    react = models.IntegerField(blank=True, default=0)
    comments = models.ManyToManyField("Comment", related_name="post_comment", blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def get_created(self):
        time = datetime.now()
        if self.created.day == time.day:
            hour = (time.hour - self.created.hour)
            if hour > 1:
                return str(hour) + " hours ago"
            else:
                return str(time.minute - self.created.minute) + " minute ago"
        else:
            if self.created.month == time.month:
                return str(time.day - self.created.day) + " days ago"

        return self.created

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    userpost = models.ForeignKey(UserPost, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Comments"
        ordering = ["-created"]

    def get_created(self):
        time = datetime.now()
        if self.created.day == time.day:
            hour = (time.hour - self.created.hour)
            if hour > 1:
                return str(hour) + " hours ago"
            else:
                return str(time.minute - self.created.minute) + " minute ago"
        else:
            if self.created.month == time.month:
                return str(time.day - self.created.day) + " days ago"

        return self.created

    def __str__(self):
        return self.body