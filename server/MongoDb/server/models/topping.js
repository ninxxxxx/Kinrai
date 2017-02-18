var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toppingSchema = new Schema({
	title: {type: String, required: true},
	 tops: [{title: String, price: {type: Number, default: 0}}],
});

// foodSchema.methods.getPrice = function(){
// 	console.log(this.title + 'price is ' + this.price);
// 	return this.price;

// }



var Topping = mongoose.model('Topping', toppingSchema);

module.exports = Topping;