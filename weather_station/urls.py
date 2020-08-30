"""weather_station URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from django.contrib import admin


from weather_station.view import UserViewSet, StationViewSet, MeasurementTypeViewSet, StationMeasurementTypeViewSet

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('stations', StationViewSet)
router.register('measurementType', MeasurementTypeViewSet)
router.register('stationMeasurementType', StationMeasurementTypeViewSet)
# router.register("measurements", MeasurementViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('home/', TemplateView.as_view(template_name='home.html'), name='home'),
]
