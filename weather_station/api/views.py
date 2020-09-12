from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from weather_station.api.models import Station, MeasurementType, StationMeasurementType, MeasurementView
from weather_station.api.permissions import IsAdminUserOrReadOnly
from weather_station.api.serializers import StationSerializer, UserSerializer, MeasurementTypeSerializer, \
    StationMeasurementTypeSerializer, MeasurementSerializer
from weather_station.common.constants import Constants
from weather_station.common.process_measurement import ProcessMeasurement


class StationViewSet(ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]

    filter_backends = [DjangoFilterBackend]
    filter_fields = ['name']

    queryset = Station.objects.all()
    serializer_class = StationSerializer


class MeasurementViewSet(ModelViewSet):
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['station']
    queryset = MeasurementView.objects.all()
    serializer_class = MeasurementSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [IsAdminUserOrReadOnly]

    queryset = User.objects.all()
    serializer_class = UserSerializer


class MeasurementTypeViewSet(ModelViewSet):
    queryset = MeasurementType.objects.all()
    serializer_class = MeasurementTypeSerializer

    # @detail_route(methods=['post'])
    # def newMeasurement(self, request, **kwargs):
    #


class StationMeasurementTypeViewSet(ModelViewSet):
    queryset = StationMeasurementType.objects.all()
    serializer_class = StationMeasurementTypeSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'key': token.key, 'username': token.user.username, 'is_admin': token.user.is_superuser})


class SendView(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @csrf_exempt
    def send(request):
        if request.method == 'POST':
            return_message = ProcessMeasurement.parse_send_request(request)
            return JsonResponse(return_message, safe=False)
        else:
            return_message = Constants.INCORRECT_REQUEST_TYPE_MESSAGE
        return HttpResponse(return_message, content_type="application/json")
