// var food = require('food');
var mongoose = require('mongoose');	

var Schema = mongoose.Schema;

var tableZoneSchema = new Schema({
	zone: {type: String},
	tables: [{type: String}]  
});


var TableZone = mongoose.model('TableZone', tableZoneSchema);

module.exports = TableZone;