var Food = require('./food');
var mongoose = require('mongoose');	
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	
	food: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'},
	amount: {type: Number, default: 1},
	date: {type: Date, default: Date.now},
	optional: {type: String},
	price: {type: Number},
	status: {type: String}

});

orderSchema.methods.setOrderPrice = function(){
	this.price = this.amount * this.food.price;
	console.log("order's price = "+ this.price);
}

orderSchema.methods.initStatus = function(){
	this.status = "waiting";
	console.log("initialize status");
}

var order = mongoose.model('Order', orderSchema);

module.exports = order;