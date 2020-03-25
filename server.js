'use strict';
const express = require('express');
// App
const app = express();
var body_parser = require('body-parser').json();
var ip = process.env.IP || 'localhost';
var h = process.env.HOST ||'localhost';

// Constants
const PORT = 3000;
const HOST = h;


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

app.get('/viewEpisodios',body_parser,  (req, res)=>{
    var serieId = req.body.serieId || 1;
    console.log(req.body);
    mc.query("select * from catalogo_episodio where serieId = "+ serieId +";", function (err, result, fields) {
        if (err) {throw err;}
        else{
            res.json(result);	
        }
        });
});


app.get('/viewVideo',body_parser,  (req, res)=>{
    var url = req.body.url || 'https://mega.nz/embed#!A7h2SCjY!k5CKlP_n2Cw4Xw9rGaI7lnZC99NvvNRIIg0v7r4X6tk';
    var title = req.body.title || 'Aqui va un titulo';
    var response =  '<!doctype html> \n'+
                    '<html lang="en"> \n'+ 
                    '<head> \n' +
                    '<meta charset="utf-8"> \n'+
                    '<title>'+title+'</title> \n'+
                    '</head> \n' +
                    '<body> \n'+
                    '<iframe width="640" height="360" frameborder="0" src="'+url+'" allowfullscreen ></iframe> \n'+
                    '</body>\n'+
                    '</html>';
    res.send(response);
});


app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);