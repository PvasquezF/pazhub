'use strict';
const express = require('express');

// App
const app = express();
var cors = require('cors');
var body_parser = require('body-parser').json();
var ip = process.env.IP || '35.194.48.100';
var h = process.env.HOST || 'localhost';

// Constants
const PORT = 3000;
const HOST = h;

app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));



const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: ip,
    user: 'root',
    password: 'root',
    database: 'DB_PazHUB'
});
mc.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexion correcta.');
    }
});

app.get('/', function(req, res) {
    res.send("HelloWorld")
});

app.get('/viewSeries', (req, res) => {
    mc.query("Select * from Serie;", function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result);
        }
    });
});

app.get('/pelicula/:peliculaId', (req, res) => {
    mc.query("Select * from Pelicula where peliculaId = " + req.params.peliculaId + ";", function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result);
        }
    });
});

app.get('/episodio/:episodioId', (req, res) => {
    mc.query("Select * from Catalogo_Episodio where episodioId = " + req.params.episodioId + ";", function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result);
        }
    });
});

app.get('/viewPeliculas', (req, res) => {
    mc.query("Select * from Pelicula;", function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result);
        }
    });
});

app.get('/getPeliculaPaginas', (req, res) => {
    mc.query("Select Count(peliculaId)/10 AS paginas from Pelicula;", function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result);
        }
    });
});

app.get('/getSeriePaginas', (req, res) => {
    mc.query("Select Count(SerieId)/10 AS paginas from Serie;", function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result);
        }
    });
});

app.get('/viewCatalogoPeliculas/:pagina', (req, res) => {
    var numero = req.params.pagina|1;
    var query = "CALL getAllFilm2("+ numero+")"
    mc.query(query, function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result[0]);
        }
    });
});

app.get('/viewCatalogoSeries/:pagina', (req, res) => {
    var numero = req.params.pagina|1;
    var query = "CALL getAllSerie2("+ numero+")"
    mc.query(query, function(err, result, fields) {
        if (err) { throw err; } else {
            res.json(result[0]);
        }
    });
});

app.get('/viewEpisodios', body_parser, (req, res) => {
    var vacio = {};
    if (Object.entries(vacio).toString() === Object.entries(req.query).toString()) {
        //console.log("Es Body");
        var serieId = req.body.serieId || 1;
        mc.query("select CA.episodioId, CA.episodioName, SE.serieImagen as episodioImagen from Catalogo_Episodio as CA Inner join Serie as SE on CA.serieId = SE.serieId  where CA.serieId = " + serieId + ";", function(err, result, fields) {
            if (err) { throw err; } else {
                res.json(result);
            }
        });
    } else {
        //console.log("Es Query");
        var serieId = req.query.serieId;
        mc.query("select CA.episodioId, CA.episodioName, SE.serieImagen as episodioImagen from Catalogo_Episodio as CA Inner join Serie as SE on CA.serieId = SE.serieId  where CA.serieId = " + serieId + ";", function(err, result, fields) {
            if (err) { throw err; } else {
                res.json(result);
            }
        });
    }

});


app.get('/viewVideo', body_parser, (req, res) => {
    var url = req.body.url || 'https://mega.nz/embed#!A7h2SCjY!k5CKlP_n2Cw4Xw9rGaI7lnZC99NvvNRIIg0v7r4X6tk';
    var title = req.body.title || 'Aqui va un titulo';
    var response = '<!doctype html> \n' +
        '<html lang="en"> \n' +
        '<head> \n' +
        '<meta charset="utf-8"> \n' +
        '<title>' + title + '</title> \n' +
        '</head> \n' +
        '<body> \n' +
        '<iframe width="640" height="360" frameborder="0" src="' + url + '" allowfullscreen ></iframe> \n' +
        '</body>\n' +
        '</html>';
    res.send(response);
});

app.post('/registrarPelicula', body_parser, function(req, res) {
    var name = req.body.name;
    var descripcion = req.body.descripcion;
    var urlimagen = req.body.urlimagen;
    var urlpelicula = req.body.urlpelicula;

    var query = "insert into Pelicula(peliculaName, peliculaDescripcion,peliculaImagen,peliculaURL) values('" + name + "','" + descripcion + "','" + urlimagen + "','" + urlpelicula + "');"


    mc.query(query, function(err, result, fields) {
        if (err) { res.send("FAIL!!!!") } else {
            res.send("SUCCESS")
        }
    });

});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);