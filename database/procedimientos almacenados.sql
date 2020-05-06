DELIMITER //
Create Procedure insertFilm( 
	IN nombre varchar(100), 
	IN descripcion varchar(5000),
	IN imagen varchar(2000),
	IN url varchar(2000)
)
BEGIN
	insert into Pelicula(peliculaName, peliculaDescripcion, peliculaImagen, peliculaURL)
	values(nombre, descripcion, imagen, url);
END //
DELIMITER ;


DELIMITER //
create procedure getAllFilm()
BEGIN
	Select * from Pelicula ;
END //
DELIMITER ;

DELIMITER //
create procedure getAllSerie()
BEGIN
	Select * from Serie ;
END //
DELIMITER ;

DELIMITER //
create procedure getAllCap(IN id_serie INT)
BEGIN
	Select CA.episodioId, CA.episodioName, SE.serieImagen as episodioImagen from Catalogo_Episodio as CA Inner join Serie as SE on CA.serieId = SE.serieId  where CA.serieId = id_serie;
END //
DELIMITER ;

DELIMITER //
create procedure getCap(IN id_cap INT)
BEGIN
	Select * from Catalogo_Episodio where episodioId  = id_cap ;
END //
DELIMITER ;

DELIMITER //
create procedure getFilm(IN id_film INT)
BEGIN
	Select * from Pelicula where peliculaId  = id_film ;
END //
DELIMITER ;

DELIMITER //
create procedure getAllFilm2(IN numero int)
BEGIN
	DECLARE inf, sup INT default 0;
    SET inf = (numero-1)*10;
	Select  * from Pelicula  limit inf, 10;
END //
DELIMITER ;

DELIMITER //
create procedure getAllSerie2(IN numero int)
BEGIN
	DECLARE inf, sup INT default 0;
    SET inf = (numero-1)*10;
	Select * from Serie limit inf, 10;
END //
DELIMITER ;

DELIMITER //
create procedure getCountFilm()
BEGIN
	Select Format(count(*)/10 +1 ,0) as paginas from Pelicula;
END //
DELIMITER ;

DELIMITER //
create procedure getCountSerie()
BEGIN
	Select Format(count(*)/10 +1 ,0) as paginas from Serie;
END //
DELIMITER ;