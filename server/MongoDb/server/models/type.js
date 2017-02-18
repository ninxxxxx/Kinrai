var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = new Schema({
	title: {type: String, required: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	foods: [{type: Schema.Types.ObjectId, ref: 'Food'}]
});

// typeSchema.methods.getPrice = function(){
// 	console.log(this.title + 'price is ' + this.price);
// 	return this.price;

// }




var Type = mongoose.model('Type', typeSchema);

module.exports = Type; 