from django.contrib.auth.models import User
from django.db import models


class Station(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=300, blank=True, default='')
    user = models.ManyToManyField(User, through='StationUser')

    class Meta:
        db_table = "station"


class Measurement(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    time_of_measurement = models.DateTimeField()
    longitude = models.FloatField(blank=True, default=None)
    latitude = models.FloatField(blank=True, default=None)

    class Meta:
        db_table = "measurement"


class MeasurementData(models.Model):
    measurement = models.ForeignKey(Measurement, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    unit = models.CharField(max_length=50)
    value = models.FloatField()

    class Meta:
        db_table = "measurement_data"


class StationUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'station'),)
        db_table = "station_user"

# class MeasurementType(models.Model):
#     name = models.CharField(max_length=30)
#
#     class Meta:
#         db_table = 'measurement_type'
#
#
# class StationMeasurementType(models.Model):
#     station = models.ForeignKey(Station, on_delete=models.CASCADE)
#     measurement_type = models.ForeignKey(MeasurementType, on_delete=models.CASCADE)
#
#     class Meta:
#         unique_together = (('station', 'measurement_type'),)
#         db_table = 'station_measurement_type'
