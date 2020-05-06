create database DB_PazHUB;
use DB_PazHUB;
create table Usuario(
    User_Name varchar(30) not null,
    Correo_Electronico varchar(50) not null,
    Primer_Nombre varchar(30) not null,
    Segundo_Nombre varchar(30) null,
    Primer_Apellido varchar(30) not null,
    Segundo_Apellido varchar(30) null,
    Telefono int,
    Fecha_Nacimiento date not null,
    Pais varchar(30) not null,
    Ciudad varchar(30) not null,
    Contrasena varchar(500) not null,
    createdAt date not null,
	updatedAt date not null,
    primary key(User_Name, Correo_Electronico)
    
);