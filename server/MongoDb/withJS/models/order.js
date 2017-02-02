var Food = require('./food');
var mongoose = require('mongoose');	
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	// bill_number: {type: Number},
	wait_time: {type: Number, default: 0},
	food: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
	amount: {type: Number, default: 1},
	date: {type: Date, default: Date.now},
	selected_toppings: [{title: String, optionTitle: String, price: Number}],
	price: {type: Number},
	status: {type: String, default: "waiting"}

});

orderSchema.methods.setOrderPrice = function(){
	this.price = this.amount * this.food.price;
	console.log("order's price = "+ this.price);
}

orderSchema.methods.initStatus = function(){
	this.status = "waiting";
	console.log("initialize status");
}

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;