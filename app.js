'use strict'
var http = require('http'), express = require('express');
var bodyParser = require("body-parser");
var bookApp = require('./models/bookApp');
var app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/settings', function (req, res) {
    res.send(bookApp.getSettings());
});

app.post('/registration', function (req, res) {
    res.send(bookApp.registration(req.body)) ;
});

app.post('/login', function (req, res) {
    res.send(bookApp.login(req.body)) ;
});

app.post('/getData', function (req, res) {
    res.send(bookApp.getData(req.body)) ;
});

app.post('/postData', function (req, res) {
    res.send(bookApp.postData(req.body)) ;
});

app.post('/logout', function (req, res) {
    res.send(bookApp.logout(req.body)) ;
});

app.listen(3000, function () {
    console.log('book is listening on port 3000!');
});