from rest_framework import filters

from weather_station.common.process_measurement import ProcessMeasurement
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from weather_station.common.constants import Constants
from weather_station.models import Station, MeasurementType, StationMeasurementType
from weather_station.serializers import StationSerializer, UserSerializer, MeasurementTypeSerializer, \
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


