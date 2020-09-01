from django.contrib.auth.models import User
from django.db import models


# class User(models.Model):
#     username = models.CharField(max_length=40)
#     email = models.CharField(max_length=100)
#     password = models.CharField(max_length=30)


class Station(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200)
    user = models.ManyToManyField(User, through='StationUser')

    class Meta:
        db_table = "station"


class Measurement(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    time_of_measurement = models.DateTimeField()

    class Meta:
        db_table = "measurement"


class Temperature(models.Model):
    measurement = models.OneToOneField(Measurement, primary_key=True, on_delete=models.CASCADE,
                                       parent_link=True)
    value = models.FloatField()
    unit = models.CharField(max_length=20)

    class Meta:
        db_table = "temperature"


class Humidity(models.Model):
    measurement = models.OneToOneField(Measurement, primary_key=True, on_delete=models.CASCADE,
                                       parent_link=True)
    value = models.FloatField()
    unit = models.CharField(max_length=20)

    class Meta:
        db_table = "humidity"


class Pressure(models.Model):
    measurement = models.OneToOneField(Measurement, primary_key=True, on_delete=models.CASCADE,
                                       parent_link=True)
    value = models.FloatField()
    unit = models.CharField(max_length=20)

    class Meta:
        db_table = "pressure"


class PM_10(models.Model):
    measurement = models.OneToOneField(Measurement, primary_key=True, on_delete=models.CASCADE,
                                       parent_link=True)
    value = models.FloatField()
    unit = models.CharField(max_length=20)

    class Meta:
        db_table = "PM_10"


class PM_2_5(models.Model):
    measurement = models.OneToOneField(Measurement, primary_key=True, on_delete=models.CASCADE,
                                       parent_link=True)
    value = models.FloatField()
    unit = models.CharField(max_length=20)

    class Meta:
        db_table = "PM_2_5"


class StationUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    isAdmin = models.BooleanField()

    class Meta:
        unique_together = (('user', 'station'),)
        db_table = "station_user"


class MeasurementView(models.Model):
    station = models.CharField(max_length=200, db_column='station name')
    id = models.BigIntegerField(primary_key=True)
    time_of_measurement = models.DateTimeField()
    temperature = models.FloatField()
    temperature_unit = models.CharField(max_length=20, db_column='temperature unit')
    pressure = models.FloatField()
    pressure_unit = models.CharField(max_length=20, db_column='pressure unit')
    humidity = models.FloatField()
    humidity_unit = models.CharField(max_length=20, db_column='humidity unit')
    PM2_5 = models.FloatField(db_column='PM 2.5')
    PM2_5_unit = models.CharField(max_length=20, db_column='PM 2.5 unit')
    PM_10 = models.FloatField(db_column='PM 10')
    PM10_unit = models.CharField(max_length=20, db_column='PM 10 unit')

    class Meta:
        db_table = "all_measurements"
        managed = False


class MeasurementType(models.Model):
    name = models.CharField(max_length=30)
    value_string = models.CharField(max_length=50)
    unit_string = models.CharField(max_length=50)

    class Meta:
        db_table = 'measurement_type'


class StationMeasurementType(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    measurement_type = models.ForeignKey(MeasurementType, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('station', 'measurement_type'), )
        db_table = 'station_measurement_type'

