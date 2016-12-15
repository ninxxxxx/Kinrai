var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
	title: {type: String, required: true},
	price: {type: Number, default: 0},
	type: {type: String},
	category: {type: String},
	estTime: {type: Number}
});

foodSchema.methods.getPrice = function(){
	console.log(this.title + 'price is ' + this.price);
	return this.price;

}



var Food = mongoose.model('Food', foodSchema);

module.exports = Food;