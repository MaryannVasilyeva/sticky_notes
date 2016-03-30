var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Note = new Schema({
	title: {type: String, required: true},
	complete: {type: Boolean, default: false}
});

mongoose.model('Note', Note);
mongoose.connect('mongodb://localhost/sticky-notes');
