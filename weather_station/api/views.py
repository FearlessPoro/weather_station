from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from pytz import unicode
from rest_framework import filters
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from weather_station.common.constants import Constants
from weather_station.common.process_measurement import ProcessMeasurement
from weather_station.api.models import Station, MeasurementType, StationMeasurementType
from weather_station.api.serializers import StationSerializer, UserSerializer, MeasurementTypeSerializer, \
    StationMeasurementTypeSerializer


class StationViewSet(ModelViewSet):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Station.objects.all()
    serializer_class = StationSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MeasurementTypeViewSet(ModelViewSet):
    queryset = MeasurementType.objects.all()
    serializer_class = MeasurementTypeSerializer


class StationMeasurementTypeViewSet(ModelViewSet):
    queryset = StationMeasurementType.objects.all()
    serializer_class = StationMeasurementTypeSerializer


class LoginView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)


class SendView(APIView):
    # permission_classes = (IsAuthenticated,)

    @staticmethod
    @csrf_exempt
    def send(request):
        if request.method == 'POST':
            return_message = ProcessMeasurement.parse_send_request(request)
            return JsonResponse(return_message, safe=False)
        else:
            return_message = Constants.INCORRECT_REQUEST_TYPE_MESSAGE
        return HttpResponse(return_message, content_type="application/json")
