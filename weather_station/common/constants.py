class Constants:
    DATA_TOO_OLD_ERROR_MESSAGE = '''Zbyt stare dane.
    Upewnij się czy twoj czujnik wysyla poprawna date w formacie:
    YYYY-MM-DD HH:MM:SS\n'''
    MINIMUM_REQUIREMENTS_MET_MESSAGE = 'Dane sa wystarczajace. Przetwarzanie...\n'
    INSUFFICIENT_DATA_FOUND_ERROR = 'Dane musza zawierac pola: Station_ID i Time_of_measurements\n'
    PRESSURE_MEASUREMENT_FOUND_MESSAGE = 'Znaleziono i dodano pomiar cisnienia\n'
    TEMPERATURE_MEASUREMENT_FOUND_MESSAGE = 'Znalezino i dodano pomiar temperatury\n'
    HUMIDITY_MEASUREMENT_FOUND_MESSAGE = 'Znaleziono i dodano pomiar wilgotnosci\n'
    PM_2_5_MEASUREMENT_FOUND_MESSAGE = 'Znaleziono i dodano pomiar czasteczek PM2.5\n'
    PM_10_MEASUREMENT_FOUND_MESSAGE = 'Znaleziono i dodano pomiar czasteczek PM10\n'
    DATETIME_FORMAT_STRING = "%Y-%m-%d %H:%M:%S"
    DATA_PARSING_ENDED_MESSAGE = 'Zakonczono przetwarzanie danych.\n'
    ID_MESSAGE = 'Dodane dane maja id: '
    INCORRECT_REQUEST_TYPE_MESSAGE = 'Ta strona powinna byc wywolywana tylko poprzez poprawne paczki danych JSON\n'
    NO_SUCH_TOKEN_MESSAGE = "Ten token nie jest w bazie danych. Upewnij się że twój token jest aktualny.\n"

    PM_2_5_MEASUREMENT_VALUE_VARIABLE = 'PM_2_5_value'
    PM_2_5_MEASUREMENT_UNIT_VARIABLE = "PM_2_5_unit"
    PM_10_MEASUREMENT_VALUE_VARIABLE = 'PM10_value'
    PM_10_MEASUREMENT_UNIT_VARIABLE = "PM10_unit"
    PRESSURE_VALUE_VARIABLE = 'pressure_value'
    PRESSURE_UNIT_VARIABLE = 'pressure_unit'
    TEMPERATURE_VALUE_VARIABLE = 'temperature_value'
    TEMPERATURE_UNIT_VARIABLE = 'temperature_unit'
    HUMIDITY_VALUE_VARIABLE = 'humidity_value'
    HUMIDITY_UNIT_VARIABLE = 'humidity_unit'
    STATION_ID_VARIABLE = "Station_ID"
    TIME_OF_MEASUREMENT_VARIABLE = "time_of_measurements"

