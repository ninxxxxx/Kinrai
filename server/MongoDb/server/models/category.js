var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	title: {type: String, required: true},
	types: [{type: Schema.Types.ObjectId, ref: 'Type'}],
	img_url: {type: String, default: ""}
});

// categorySchema.methods.getPrice = function(){
// 	console.log(this.title + 'price is ' + this.price);
// 	return this.price;

// }



var Category = mongoose.model('Category', categorySchema);

module.exports = Category; 