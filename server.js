'use strict';
const express = require('express');
// App
const app = express();
var body_parser = require('body-parser')
var ip = process.env.IP || 'localhost';
var h = process.env.HOST ||'localhost';

// Constants
const PORT = 3000;
const HOST = h;


app.use(body_parser.urlencoded({extended:true}));

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: ip,
    user: 'root',
    password: '1234',
    database: 'db_pazhub'
});
mc.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('Conexion correcta.');
    }
 });

app.get('/', function(req,res){
    res.send("HelloWorld")
});

app.get('/viewSeries',(req, res)=> {
    mc.query("Select * from serie;", function (err, result, fields) {
        if (err) {throw err;}
        else{
            res.json(result);	
        }
        });
});

app.get('/viewPeliculas',(req, res)=> {
    mc.query("Select * from pelicula;", function (err, result, fields) {
        if (err) {throw err;}
        else{
            res.json(result);	
        }
        });
});

app.get('/viewEpisodios', function(req, res){
    var serieId = req.body.serieId || 1;

    mc.query("select * from catalogo_episodio where serieId = "+ serieId +";", function (err, result, fields) {
        if (err) {throw err;}
        else{
            res.json(result);	
        }
        });
});


app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);