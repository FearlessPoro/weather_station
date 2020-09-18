from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from weather_station.api.views import *

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('stations', StationViewSet)
router.register("measurements", MeasurementViewSet)
router.register("stationUser", StationUserViewSet)
router.register("measurementData", MeasurementDataViewSet)

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
