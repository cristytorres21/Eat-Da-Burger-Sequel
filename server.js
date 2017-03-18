// Server.js - This file is the initial starting point for the Node/Express server.

// Dependencies
// =============================================================
var express 	= require("express");
var bodyParser 	= require("body-parser");
var methodOverride = require("method-override")

// models 
var db = require("./models");

var app = express();
// static content from "public" directory 
app.use(express.static(__dirname + "/public"));


// parse qpplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);
app.use("/insert", routes);
app.use("/update", routes);

// listen on port 8080
var port = process.env.PORT || 8080;
db.sequelize.sync().then(function() {
	app.listen(port);
	console.log("App listening on PORT " + port);
});

// console.log(module.exports);