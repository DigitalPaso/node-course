const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine', 'hbs');


// Middlewares
app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log (log);
    fs.appendFile("server.log", log+"\n", (err) => {
	if (err) 
	    console.log ("Unable to append to server.log"); }
    );
    next();
});

/*
app.use(function (req, res, next) {
    res.render ("maintenance.hbs", {
        maintenanceMessage: "Page down for mainenance"
    });
});
*/

// order matters!
app.use(express.static(__dirname+"/public"));

hbs.registerHelper("getCurrentYear", function(){
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt", function(text){
    return text.toUpperCase();
});

app.get ("/", function (req, res) {
    res.render ("home.hbs", {
	pageTitle: "Home Page",
	welcome: "Welcome to the HBS homepage."
    });
});

app.get ("/about", function (req, res) {
    res.render ("about.hbs", {
	pageTitle: "About Page"
    });
});

app.get ("/projects", function (req, res) {
    res.render ("about.hbs", {
	pageTitle: "Projects Page"
    });
});

app.get ("/bad", function (req, res) {
    res.send ({
	errorMessage: "Something went wrong. Unable to handle request."
    });
});

app.listen (port, function () {
    console.log (`Server is up on port ${port}`);
});
