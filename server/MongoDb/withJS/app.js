var express = require("express");
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var os = require('os');
var ifaces = os.networkInterfaces();

var app = express();


var Bill = require("./models/bill");
var Order = require("./models/order");
var Category = require("./models/category");
var Type = require("./models/type");
var Food = require("./models/food");
var Topping = require("./models/topping");



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

console.log(getIpAddress());



// foods = [
// {
// 	title: "ข้าวไข่ดาว",
// 	price: 30,
// 	estimate_time: 5,
// }


// ]

newCategory = function(){
	cats = [
	{title: "Main Dish"},
	{title: "Snack"},
	{title: "Drink"},
	{title: "Ice Cream"},
	];
	Category.insertMany(cats, function(err){
		if(err) throw err;
		console.log("bulk completed");
	});
}
// newCategory();


newType = (category_id, type) =>{

	t = new Type(type);
	Category.findById(category_id, (err, cat) =>{
		if(err) throw err;
		t.category = cat._id;
		cat.types.push(t);

		t.save((err)=>{
			if(err) throw err;
			console.log("Type saved");
		});

		cat.save((err)=>{
			if(err) throw err;
			console.log("Category saved");
		});
	});

}

// c = "587b8f44a4f090e807e28a7e";
// t = new Type({
// 	title: "Braised"
// });

// newType(c, t);
newFood = (type_id, food) =>{
	f = new Food(food);
	Type.findById(type_id, (err, type) =>{
		if(err) throw err;
		f.type = type._id;
		f.category = type.category;
		type.foods.push(f);

		f.save((err)=>{
			if(err) throw err;
			console.log("Food saved");
		});

		type.save((err)=>{
			if(err) throw err;
			console.log("type saved");
		});
	});
}

//587b8f73f26b14000aa5c9e5
// ff = new Food({
// 	title: "Pork Steak",
// 	price: 249,
// 	estimate_time: 10,
// });
// newFood("587b8f73f26b14000aa5c9e5", ff);






// getCats = () =>{
// 	let categories;
// 	Category.find({})
// 	.populate({path: 'types', populate: {path: 'foods'}})
// 	.exec((err, cats)=>{
// 		if(err) throw err;
// 		// console.log(cats);
// 		// console.log(cats[0].types[0]);
// 		categories = cats;
// 		// console.log(categories);
// 	});
// 		console.log(categories);
// 	// return categories;
// }

// getCat();


app.get('/category', (req, res)=>{
	// getCats();
	Category.find({})
	.populate({path: 'types', populate: {path: 'foods'}})
	.exec((err, cats)=>{
		if(err) throw err;
		res.json(cats);
	});
});


app.get('/uploads/images/foods/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/images/foods/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});


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



app.listen(8080);
console.log("App listening on port 8080");
