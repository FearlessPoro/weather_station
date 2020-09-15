from django.contrib.auth.models import User
from rest_framework import serializers

from weather_station.api.models import Station, MeasurementType, StationMeasurementType, MeasurementView, Measurement, \
    StationUser


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


class MeasurementViewSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MeasurementView
        fields = '__all__'


class MeasurementSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Measurement
        fields = '__all__'


class MeasurementTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MeasurementType
        fields = '__all__'


class StationMeasurementTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StationMeasurementType
        fields = '__all__'


class StationUserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    station = StationSerializer

    class Meta:
        model = StationUser
        fields = '__all__'
        ordering = ['-id']
        lookup_field = 'user'

