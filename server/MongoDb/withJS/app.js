var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);

var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var os = require('os');
var ifaces = os.networkInterfaces();



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

// var server = app.listen(8080);
// console.log("App listening on port 8080");
// ===========================================================

// ======================Socket part =========================


io.on('connection', function(socket){
	console.log("user connected");
	socket.on('hello', function(msgs){
		console.log(msgs);
		io.emit('hello', "Did you said " + msgs + " ?");
	});

	socket.on('orders changed', function(msgs){
		console.log("orders changed");
		io.emit('orders changed', "...");
	});
});

server.listen(8080);






// ===========================================================



newCategory = function(categoryTitle){

	let category = new Category({
		title: categoryTitle
	});

	Category.save(err =>{
		if(err) throw err;
		console.log("category saved");
	});      
	// cats = [
	// {title: "Main Dish"},
	// {title: "Snack"},
	// {title: "Drink"},
	// {title: "Ice Cream"},
	// ];
	// Category.insertMany(cats, function(err){
	// 	if(err) throw err;
	// 	console.log("bulk completed");
	// });
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
// 	title: "นึ่ง"
// });
// newType(c, t);
newFood = (type_id, food) =>{
	f = new Food(food);
	Type.findById(type_id, (err, type) =>{
		if(err) throw err;
		f.type = type._id;
		f.category = type.category;
		console.log(f.category)
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
//587b9164fea1934819a6fc0f
//tom 587d1f159308bc881e7fe6cb
//nung 587d1f3a62591f04202ddcf9
// ff = new Food({
// 	title: "ต้มยำกุ้ง",
// 	price: 990,
// 	estimate_time: 15,
// });
// newFood("587d1f3a62591f04202ddcf9", ff);






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
	Category.find({}, (err, cats)=>{
		if(err) throw err;
		res.json(cats);
	});
	
});

app.get('/category/getfull', (req, res)=>{
	// getCats();
	Category.find({types:{$exists: true, $ne: []}})
	.populate({
		path: 'types', 
		match: {foods:{$exists: true, $ne:[]}},
		populate: {path: 'foods', populate: {path: 'toppings'}}
	}).exec((err, cats)=>{
		// console.log(cats);
		res.json(cats);
	});
});

app.post('/category/new', function(req, res){

	let category = new Category({
		title: req.body.categoryTitle
	});


	category.save(err =>{
		if(err) throw err;
		console.log("category saved");
	}).then(()=>{
		Category.find({})
		.populate({path: 'types', populate: {path: 'foods'}})
		.exec((err, cats)=>{
			if(err) throw err;
			res.json(cats);
		});	
	});

});

app.post('/type', (req, res)=>{
	Category.findById(req.body.categoryId)
	.populate("types")
	// .populate({path: 'types', populate: {path: 'foods'}})
	.exec((err, cat)=>{
		if(err) throw err;
		res.json(cat);
	});
});

app.post('/type/new', function(req, res){
	let type = new Type({
		title: req.body.typeTitle,
		category: req.body.categoryId
	});

	Category.findById(req.body.categoryId)
	.populate("types")
	.exec((err, cat)=>{
		if(err) throw err;

		cat.types.push(type);
		type.save(err =>{
			if(err) throw err	
		}).then(()=>{
			cat.save(err =>{
				if(err) throw err	
				// console.log("category updated");	
		});
		});
		// console.log(cat);	
		res.json(cat);
	});

})

app.post('/food', function(req, res){

	Category.findById(req.body.categoryId)
	.populate({path: 'types', populate: {path: 'foods'}})
	.exec((err, cat)=>{
		if(err) throw err;
		res.json(cat);
	});	
});

app.post('/food/getById', function(req, res){
	console.log("bababa");
	foodId = req.body.foodId;
	console.log(foodId);
		// res.json(foodId);
		Food.findById(foodId)
		.populate('type', 'title')
		.populate('category', 'title')
		.populate('toppings')
		.exec((err, food) =>{
			if(err) throw err;
			res.json(food);
		});
	});

app.post('/newfood',(req, res)=>{
	let food = new Food(req.body.food);
	let image = req.body.image;
	console.log(food);
	if(image){
		console.log("got image");
		let newPath = __dirname + "/uploads/images/foods/" + image.title;
		let newData = new Buffer(image.data, "binary");
		fs.writeFileSync(newPath, newData);
		food.img_url = "http://" + getIpAddress() + ":8080" + "/uploads/images/foods/" + image.title; 
	}
	Type.findById(food.type, (err, type)=>{
		type.foods.push(food);

		food.save(err =>{
			if(err) throw err;
			console.log("food created")
		}).then(()=>{
			if(err) throw err;
			type.save(err =>{
				if(err) throw err;
				console.log("type updated");
			});
		});
	});		
	res.json({typeId: food.type._id});
});
// });

	// let ip = getIpAddress();
	// console.log("in new food: " + ip);

	app.get('/topping', (req, res)=>{

		Topping.find({}, (err, toppings)=>{

			if(err) throw err;
			res.json(toppings);
			// type.save(err =>{
			// });
		});
	});

	app.post('/topping/new', (req, res)=>{
		let topping = new Topping(req.body.topping);
		console.log(topping);
		topping.save((err)=>{
			if(err) throw err;
			console.log("new topping was saved");
		}).then(()=>{
			Topping.find({}, (err, toppings)=>{
				if(err) throw err;
				console.log("send topings back");
				res.json(toppings);
			});
		});
	});





	app.get('/uploads/images/foods/:file', function (req, res){
		file = req.params.file;
		var img = fs.readFileSync(__dirname + "/uploads/images/foods/" + file);
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');

	});


	app.post('/bill/new', function(req, res){
		let rawBill = req.body.bill;
		let bill = new Bill();
		let date = new Date();
		// date.setHours(date.getHours());

		bill.total_price = rawBill.total_price;
		if(rawBill.table_number == "")
			rawBill.table_number = "Individual";
		bill.table_number = rawBill.table_number;
		bill.date = date;
		
		bill.bill_number = ""+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"-";


		dateForFind = new Date();
		dateForFind.setHours(dateForFind.getHours() - 7);
		dateForFind.setMinutes(0);
		dateForFind.setSeconds(0);
		console.log("DateForFind " + dateForFind);
		Bill.find({date: {$gt: dateForFind}}, function(err, bills){
			if(err) throw err;

			console.log("bills.length: " + bills.length);
			console.log(bills);
			//check if exist billNumber 
			if(bills.length != 0){
				let lst = bills[bills.length-1].bill_number.split("-");
				console.log("last index: " + lst[lst.length - 1]);
				let no = parseInt(lst[lst.length - 1]) + 1;
				console.log("No." + no);
				if(no == bills.length){
					no += 1;
				}
				bill.bill_number += no;
			}else{
				bill.bill_number += 1;
			}

			rawBill.orders.forEach(function(order){
				let o = new Order(order);
				o.date = date;
				o.bill = bill;
				bill.orders.push(o);
				o.save((err)=>{
					if(err) throw err;
				});
			})
			console.log(bill);
			bill.save((err)=>{
				if(err) throw err;
			})
		});
		res.json("Bill was created")
	});


	app.get('/orders/', function(req, res){
		// Order.find({ $or:[{status: "waiting"}, {status: "doing"}] }).populate('food').populate('bill').exec(
		Order.find({ status:{$in:["waiting", "doing"]} }).populate('food').populate('bill').exec(
			(err, orders)=>{
				if(err) throw err;
				// console.log(orders);
				res.json(orders);
			});
	});

	app.post('/orders/findbycategories/', function(req, res){
		let chosenCats = req.body.chosenCats;
		console.log(chosenCats);
		// chosenCats.map(cat =>{ cat = new });
		Order.find({ status:{$in:["waiting", "doing"]} })
		.populate({
			path:'food',
			populate:{
				path:'category',
				match:{
					_id:{
						$in:chosenCats
					},

				}
			}
		})
		.populate('bill')
		.exec(
			(err, orders)=>{
				if(err) throw err;
				res.json(orders);
			});
	});

	app.get('/order/:order_id/changestatus/:status', function(req, res){
		let status = req.params.status;
		let order_id = req.params.order_id;
		Order.findById(order_id,function(err, order){
			if(err) throw err;
			order.status = status;

			order.save(function(err){
				if(err) throw err;
			});
			res.json("status was changed");
		});
	});

	app.get('/bills/', function(req, res){
		Bill.find({is_paid: { $ne:true }},function(err, bills){
			if(err) throw err;
			res.json(bills);
		});		
	});

	app.get('/bills/table_number/', function(req, res){
		Bill.find({}).distinct('table_number', {table_number:{$ne:"Individual"}})
		.exec((err, bills)=>{
			if(err) throw err;
			res.json(bills);
		});
	});
	app.get('/bills/table_number/:tableNumber', function(req, res){
		let table_number = req.params.tableNumber;

		Bill.find({table_number: table_number, is_paid:false}).exec((err, bills)=>{
			if(err) throw err;
			res.json(bills);
		});
	});
// 	testAdd = function(){
// 		Order.find({'food.category.title':'Main Dish'}, function(err, orders){
// 			if(err) throw err;
// 			console.log(orders);
// 		})
// 	}
// testAdd();
