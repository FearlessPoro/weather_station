create database AGH_station;
CREATE USER 'django_user'@'localhost';
ALTER USER 'django_user'@'localhost'
IDENTIFIED BY '''&8i%gO1I6v''' ;

grant all privileges on AGH_station.* TO 'django_user'@'localhost' identified by '&8i%gO1I6v';

