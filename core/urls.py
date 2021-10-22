from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('api/login/',obtain_auth_token),
    path('admin/', admin.site.urls),
    path('api/', include("facebook.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [
        re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
    ]

if not settings.DEBUG:
    urlpatterns +=[
        re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
    ]