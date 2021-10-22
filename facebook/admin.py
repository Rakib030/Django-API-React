from django.contrib import admin
from . models import User, UserPost, Comment

admin.site.register(User)


@admin.register(UserPost)
class UserPostAdmin(admin.ModelAdmin):
    list_display = ["user", "id", "title","react", "get_created"]
    list_filter = ["user", "title"]


@admin.register(Comment)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ["user","userpost","body"]
