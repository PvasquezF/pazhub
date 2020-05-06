use DB_PazHUB;
create table Serie(
	serieId int PRIMARY KEY not null,
    serieName varchar(100) not null,
    serieDescripcion varchar(5000) not null,
    serieImagen varchar(2000) not null
);

create table Catalogo_Episodio(
	episodioId int primary key auto_increment,
    episodioName varchar(100) not null,
    episodioDuracion int not null,
    episodioURL varchar(2000) not null,
    serieId int not null,
    foreign key(serieId) references Serie(serieId)
);