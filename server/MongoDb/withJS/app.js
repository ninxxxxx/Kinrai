var express = require("express");
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var os = require('os');
var ifaces = os.networkInterfaces();

var app = express();


var Food = require("./models/food");
var Bill = require("./models/bill");
var Order = require("./models/order");



mongoose.connect('mongodb://localhost/kinrai')
.then(function(){
	console.log("connected to database");
}).catch(err =>{ console.log(err)});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


getIpAddress = function(){
	let ip;
	Object.keys(ifaces).forEach(function (ifname) {
		var alias = 0;
		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return;
			}
			//Note this method will works at only one alias, that is 0 
			// console.log("ww" + iface.address);
			ip = iface.address;
			// return iface.address;
			// ++alias;
		});
	});
	return ip;
}

// console.log(getIpAddress());

app.post('/newfood',(req, res)=>{
	let food = req.body.food;
	// console.log(food);
	let newPath = __dirname + "/uploads/images/foods/" + food.image.title;
	let newData = new Buffer(food.image.data, "binary");
	fs.writeFileSync(newPath, newData);
	// let ip = getIpAddress();
	// console.log("in new food: " + ip);
	res.json({url: "http://" + getIpAddress() + ":8080" + "/uploads/images/foods/" + food.image.title});
}
);

app.get('/uploads/images/foods/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/images/foods/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.listen(8080);
console.log("App listening on port 8080");
