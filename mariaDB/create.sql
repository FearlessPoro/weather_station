create database AGH_station;
CREATE USER 'django_user'@'localhost';
ALTER USER 'django_user'@'localhost'
IDENTIFIED BY '''&8i%gO1I6v''' ;

grant all privileges on AGH_station.* TO 'django_user'@'localhost' identified by '&8i%gO1I6v';

create or replace view all_measurements as (
	select measurement.id, measurement.time_of_measurement, station .name, humidity.value as 'humidity', humidity.unit as 'humidity unit',
	pressure .value as 'pressure' , pressure.unit as 'pressure unit', temperature .value as 'temperature' , temperature.unit as 'temperature unit',
	pm_10.value as 'PM 10', pm_10.unit 'PM 10 unit', pm_2_5.value as 'PM 2.5', pm_2_5.unit as 'PM 2.5 unit'
	from measurement
		join humidity on humidity.measurement_id = measurement.id
		join pressure on pressure.measurement_id = measurement.id
		join temperature on temperature.measurement_id = measurement.id
		join pm_10 on pm_10.measurement_id = measurement.id
		join pm_2_5 on pm_2_5.measurement_id = measurement.id
		join station on station.id =measurement .station_id

);