var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({

	title: {type: String, required: true},
	price: {type: Number, default: 0},
	type: {type: Schema.Types.ObjectId, ref: 'Type'},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	estimate_time: {type: Number},
	img_url: {type: String, default: ""},
	ordered_count: {type: Number, default: 0},
	toppings: [{type: Schema.Types.ObjectId, ref: 'Topping'}] ,
	isEmpty: {type: Boolean, default: false}
});

foodSchema.methods.getPrice = function(){
	console.log(this.title + 'price is ' + this.price);
	return this.price;

}



var Food = mongoose.model('Food', foodSchema);

module.exports = Food; 