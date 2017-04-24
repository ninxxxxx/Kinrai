 // var food = require('food');
var mongoose = require('mongoose');	

var Schema = mongoose.Schema;

var billSchema = new Schema({
	bill_number: {type: String},
	date: {type: Date, default: Date.now},
	table_number: {zone: String, table: String},
	orders: [{type: Schema.Types.ObjectId, ref:'Order'}],
	total_price: {type: Number, default: 0},
	is_paid: {type: Boolean, default: false}

});


billSchema.methods.sumPrice = function(){
	console.log(this.orders)
	// this.orders.forEach(function(order){
	// 	this.total_price += order.price;
	// });
	// console.log("totle_price: " + this.total_price);
}

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;