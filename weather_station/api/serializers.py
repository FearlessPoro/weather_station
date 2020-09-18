from django.contrib.auth.models import User
from rest_framework import serializers

from weather_station.api.models import Station, Measurement, StationUser, MeasurementData


class UserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'url', 'username', "email", 'is_staff', 'is_active', 'date_joined', 'last_login')
        lookup_field = 'username'


class StationSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Station
        fields = '__all__'
        ordering = ['id']
        lookup_field = 'name'


class MeasurementSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        ordering = ['time_of_measurement']
        model = Measurement
        fields = '__all__'


class MeasurementDataSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MeasurementData
        fields = '__all__'


class StationUserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    station = StationSerializer

    class Meta:
        model = StationUser
        fields = '__all__'
        ordering = ['-id']
        lookup_field = 'user'
