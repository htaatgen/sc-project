var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var io = require("socket.io")(http);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',function(req, res){
    res.sendfile('SCProject.html')
});

var objects=[];
var effects=[];

io.on('connection', function(socket){
    "use strict";
    console.log("User connect.")
});

http.listen(3000, function(){
    console.log("Server activated.")
});

app.use(express.static('public'));