// var food = require('food');
var mongoose = require('mongoose');	

var Schema = mongoose.Schema;

var billSchema = new Schema({
	
	date: {type: Date, default: Date.now},
	table_number: {type: Number},
	orders: [{type: Schema.Types.ObjectId, ref:'Order'}],
	totalPrice: {type: Number, default: 0},
	isPaid: {type: Boolean}

});

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;