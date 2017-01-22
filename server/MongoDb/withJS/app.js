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
	Category.find({})
	.populate({path: 'types', populate: {path: 'foods'}})
	.exec((err, cats)=>{
		if(err) throw err;
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
			type.save(err =>{
				if(err) throw err;
				console.log("type updated");
			});
		});		
	});
	
	// let ip = getIpAddress();
	// console.log("in new food: " + ip);
	res.json({typeId: food.type._id});
}
);

app.get('/topping', (req, res)=>{
	Topping.find({}, (err, toppings)=>{
		if(err) throw err;
		res.json(toppings);
	})
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





app.listen(8080);
console.log("App listening on port 8080");
