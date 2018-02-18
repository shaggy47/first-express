const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();
var staticPath = path.join(__dirname,"public");
app.use("/public",express.static(staticPath));
var entries = [];
app.locals.entries = entries;

app.use(bodyParser.urlencoded({extended:false}));


app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

app.get("/new-entry",function(req,res){
    res.render("new-entry");
});

app.post("/new-entry",function(req,res){
    if(!req.body.title || !req.body.body){
        res.status(400).send("entries must have a title and a body.");
        return;
    }
    entries.push({
        title:req.body.title,
        body:req.body.body,
        published:new Date()
    });

    res.redirect("/");
});

app.use(function(req,res){
    res.status(404).render("404");
});

var server = http.createServer(app).listen(3000);

process.on("SIGINT",function(){
    console.log("Killed the server");
    server.close();
});