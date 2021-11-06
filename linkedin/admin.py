from django.contrib import admin
from . models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email",]


@admin.register(Post) 
class PostAdmin(admin.ModelAdmin):
    list_display = ["owner", "title", "updated", "get_created"]
    list_filter = ["owner",]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["owner", "body", "updated", "created"]

