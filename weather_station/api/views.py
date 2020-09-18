from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from weather_station.api.permissions import IsAdminOrReadOnly
from weather_station.api.serializers import *
from weather_station.common.process_measurement import parse_send_request


class StationViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filter_fields = ['name', 'id']
    search_fields = ['name']

    queryset = Station.objects.all()
    serializer_class = StationSerializer


class MeasurementViewSet(ModelViewSet):
    queryset = Measurement.objects.all().order_by('-time_of_measurement')
    serializer_class = MeasurementSerializer


class MeasurementDataViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    filter_backends = [DjangoFilterBackend]
    filter_fields = ['measurement']

    queryset = MeasurementData.objects.all()
    serializer_class = MeasurementDataSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['username']
    filter_fields = ['username']

    queryset = User.objects.all()
    serializer_class = UserSerializer


class StationUserViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filter_fields = ['user', 'station']
    search_fields = ['user']

    queryset = StationUser.objects.all()
    serializer_class = StationUserSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'key': token.key, 'username': token.user.username, 'is_admin': token.user.is_superuser})


class SendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        return parse_send_request(request)
