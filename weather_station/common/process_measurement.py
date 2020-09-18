import json
from datetime import datetime, timedelta

from django.http import HttpResponseBadRequest, HttpResponse
from rest_framework.authtoken.models import Token

from weather_station.api.models import *


def parse_send_request(request):
    time_delta = 3
    # try:
    body_data = json.loads(request.body)
    if 'time_of_measurement' in body_data:
        timestamp = datetime.strptime(body_data['time_of_measurement'],
                                      '%Y-%m-%d %H:%M:%S')
        if not (timestamp < datetime.now() - timedelta(days=time_delta)):
            if body_data["measurement_data"]:
                user = Token.objects.filter(key=request.META['HTTP_AUTHORIZATION'][6:]).model.user
                valid_stations = StationUser.objects.get(user=user)
                if check_admin_privileges(body_data, valid_stations):
                    measurements_model = Measurement(
                        station=Station.objects.get(id=body_data["station_id"]),
                        longitude=body_data["longitude"],
                        latitude=body_data["latitude"],
                        time_of_measurement=body_data['time_of_measurement']
                    )
                    measurements_model.save()
                    for data in body_data["measurement_data"]:
                        MeasurementData(
                            measurement=measurements_model,
                            name=data['name'],
                            unit=data["unit"],
                            value=data["value"]
                        ).save()
                else:
                    return HttpResponse('Unauthorized', status=401)
            else:
                return HttpResponseBadRequest("Bad request. Field measurements_data is empty.")
    else:
        return HttpResponseBadRequest("Bad request")
    return HttpResponse()


def check_admin_privileges(body_data, valid_stations):
    for stationUser in valid_stations:
        if stationUser["station"] == Station.objects.get(id=body_data["station_id"]).url:
            return True
    return False
