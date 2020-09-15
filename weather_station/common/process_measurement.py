import json
from datetime import datetime, timedelta

from rest_framework.authtoken.models import Token

from weather_station.common.constants import Constants
from weather_station.api.models import *


class ProcessMeasurement:

    @staticmethod
    def parse_send_request(request):
        return_message = ''
        time_delta = 3
        print(request.body)
        try:
            body_data = json.loads(request.body)
            if Constants.TIME_OF_MEASUREMENT_VARIABLE in body_data:

                timestamp = datetime.strptime(body_data[Constants.TIME_OF_MEASUREMENT_VARIABLE],
                                              Constants.DATETIME_FORMAT_STRING)
                if timestamp < datetime.now() - timedelta(days=time_delta):

                    return_message += Constants.DATA_TOO_OLD_ERROR_MESSAGE
                else:
                    tmp_token = request.META.get('HTTP_AUTHORIZATION')
                    identification_number = Token.objects.get(key=tmp_token[6:]).user_id
                    measurements_model = Measurement(
                        Station=Station.objects.get(1),
                        Time_of_measurement=body_data[Constants.TIME_OF_MEASUREMENT_VARIABLE]
                    )
                    measurements_model.save()
                    return_message += Constants.ID_MESSAGE + str(measurements_model.id) + "\n"

                    if ProcessMeasurement.unit_and_value_check(body_data,
                                                               Constants.HUMIDITY_UNIT_VARIABLE,
                                                               Constants.HUMIDITY_VALUE_VARIABLE):
                        humidity_measurements_model = Humidity(
                            Measurement=measurements_model.id,
                            Value=body_data[Constants.HUMIDITY_VALUE_VARIABLE]
                        )
                        humidity_measurements_model.save()
                        return_message += Constants.HUMIDITY_MEASUREMENT_FOUND_MESSAGE

                    if Constants.TEMPERATURE_VALUE_VARIABLE in body_data \
                            and Constants.TEMPERATURE_UNIT_VARIABLE in body_data:
                        temperature_measurements_model = Temperature(
                            Measurement=measurements_model.id,
                            Value=body_data[Constants.TEMPERATURE_VALUE_VARIABLE],
                            Unit=body_data[Constants.TEMPERATURE_UNIT_VARIABLE]
                        )
                        temperature_measurements_model.save()
                        return_message += Constants.TEMPERATURE_MEASUREMENT_FOUND_MESSAGE

                    if Constants.PRESSURE_VALUE_VARIABLE in body_data \
                            and Constants.PRESSURE_UNIT_VARIABLE in body_data:
                        pressure_measurements_model = Pressure(
                            Measurement=measurements_model.id,
                            Value=body_data[Constants.PRESSURE_VALUE_VARIABLE],
                            Unit=body_data[Constants.PRESSURE_UNIT_VARIABLE]
                        )
                        pressure_measurements_model.save()
                        return_message += Constants.PRESSURE_MEASUREMENT_FOUND_MESSAGE

                    if Constants.PM_10_MEASUREMENT_VALUE_VARIABLE in body_data \
                            and Constants.PM_10_MEASUREMENT_UNIT_VARIABLE in body_data:
                        big_particle_measurements_model = PM_10(
                            Measurement=measurements_model.id,
                            Value=body_data[Constants.PM_10_MEASUREMENT_VALUE_VARIABLE],
                            Unit=body_data[Constants.PM_10_MEASUREMENT_UNIT_VARIABLE]
                        )
                        big_particle_measurements_model.save()
                        return_message += Constants.PM_10_MEASUREMENT_FOUND_MESSAGE
                    if ProcessMeasurement.unit_and_value_check(body_data, Constants.PM_2_5_MEASUREMENT_VALUE_VARIABLE,
                                                               Constants.PM_2_5_MEASUREMENT_UNIT_VARIABLE):
                        small_particle_measurements_model = PM_2_5(
                            Measurement=measurements_model.id,
                            Value=body_data[Constants.PM_2_5_MEASUREMENT_VALUE_VARIABLE],
                            Unit=body_data[Constants.PM_2_5_MEASUREMENT_UNIT_VARIABLE]
                        )
                        small_particle_measurements_model.save()
                        return_message += Constants.PM_2_5_MEASUREMENT_FOUND_MESSAGE
                return_message += Constants.DATA_PARSING_ENDED_MESSAGE
            else:
                return_message += Constants.INSUFFICIENT_DATA_FOUND_ERROR
        except SyntaxError:
            return_message += Constants.INCORRECT_REQUEST_TYPE_MESSAGE
            return return_message
        except Exception:
            return_message += Constants.NO_SUCH_TOKEN_MESSAGE
            return return_message
        return return_message

    @staticmethod
    def any_measurement_in_body(body_data, measurement_types):
        for measurement_type in measurement_types:
            if ProcessMeasurement.unit_and_value_check(body_data,
                                                       measurement_type.unit_string,
                                                       measurement_type.value_string)\
                    is True:
                return True
        return False

    @staticmethod
    def unit_and_value_check(body_data, unit, value):
        if unit in body_data and value in body_data:
            return True
        return False
