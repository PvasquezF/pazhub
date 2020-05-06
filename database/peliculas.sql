use DB_PazHUB;
create table Pelicula(
	peliculaId int PRIMARY KEY auto_increment not null,
    peliculaName varchar(100) not null,
    peliculaDescripcion varchar(5000) not null,
    peliculaImagen varchar(2000) not null,
    peliculaURL varchar(2000) not null
);
