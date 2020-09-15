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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from weather_station.api.views import UserViewSet, StationViewSet, MeasurementTypeViewSet, \
    StationMeasurementTypeViewSet, SendView, MeasurementViewViewSet, CustomObtainAuthToken, MeasurementViewSet, \
    StationUserViewSet

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('stations', StationViewSet)
router.register('measurementType', MeasurementTypeViewSet)
router.register('stationMeasurementType', StationMeasurementTypeViewSet)
router.register("measurements", MeasurementViewViewSet)
router.register("measurementManagement", MeasurementViewSet)
router.register("stationUser", StationUserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/send/', SendView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/authenticate/', CustomObtainAuthToken.as_view()),

]
