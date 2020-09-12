from django.contrib.auth.models import User
from rest_framework import serializers

from weather_station.api.models import Station, MeasurementType, StationMeasurementType, MeasurementView


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', "email", 'is_staff', 'is_active', 'date_joined', 'last_login')
        lookup_field = 'username'


class StationSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Station
        fields = '__all__'
        ordering = ['id']


class MeasurementSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MeasurementView
        fields = '__all__'


class MeasurementTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MeasurementType
        fields = '__all__'


class StationMeasurementTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StationMeasurementType
        fields = '__all__'
