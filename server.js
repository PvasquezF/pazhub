'use strict';
const express = require('express');

// App
const app = express();
const mysql = require('mysql');
var cors = require('cors');
var body_parser = require('body-parser').json();
var ip = '34.68.232.91';

app.use(body_parser);

// Constants
const PORT = 3000;

app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo`);
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

app.get('/viewEpisodios', (req, res) => {
    var vacio = {};
    if (Object.entries(vacio).toString() === Object.entries(req.query).toString()) {
        //console.log("Es Body");
        var serieId = req.body.serieId || 1;
        mc.query("select * from Catalogo_Episodio where serieId = " + serieId + ";", function(err, result, fields) {
            if (err) { throw err; } else {
                res.json(result);
            }
        });
    } else {
        //console.log("Es Query");
        var serieId = req.query.serieId;
        mc.query("select * from Catalogo_Episodio where serieId = " + serieId + ";", function(err, result, fields) {
            if (err) { throw err; } else {
                res.json(result);
            }
        });
    }

});


app.get('/viewVideo', (req, res) => {
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