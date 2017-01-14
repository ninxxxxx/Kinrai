var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require("fs");
var Food = require("./models/food");
var Bill = require("./models/bill");
var Order = require("./models/order");

mongoose.connect('mongodb://localhost/kinrai').then(function(){
	console.log("connected to database");
})
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.post('/food/new', function(req, res){

	var food = req.body.food
	console.log(food);
	createFood(food);
	res.send("i got it Bro");
});

app.get('/food', function(req, res){
	var e = {
		firstName : "arnon",
		lastName: "kaewprasert"
	};
	res.json(e);
});


function createFood(food){
	console.log(food);
	var newFood = new Food(food);
	console.log(newFood);
}


 app.listen(8080);
console.log("App listening on port 8080");
