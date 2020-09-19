import json

from rest_framework.permissions import SAFE_METHODS, BasePermission

from weather_station.api.models import Station, StationUser


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_superuser


class isStationAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        body_data = json.loads(request.body)
        valid_stations = list(StationUser.objects.filter(user=request.user.id))
        if request.method in SAFE_METHODS or check_admin_privileges(body_data["station"], valid_stations):
            return True
        return False


def check_admin_privileges(station_id, valid_stations):
    station = Station.objects.get(id=station_id)
    for stationUser in valid_stations:
        if stationUser.station_id == station.id:
            return True
    return False
