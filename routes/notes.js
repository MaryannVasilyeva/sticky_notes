var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

router.get('/', function(req, res){
	Note.find(function(err, notes, count){
		res.send(notes);
	})
});


//POST create a new sticky note
router.post('/', function(req, res){
	new Note({
		title: req.body.title
	}).save(function(err, note, count){
		res.send(note);
	})
});

router.post('/notes_template', function(req, res){
	var note = req.body;
	res.render('note', {id: note.id, title: note.title, complete: note.complete})
});

//PUT update the sticky note
router.put('/:id', function(req, res){
	Note.findByIdAndUpdate(
		req.params.id,
		{ $set: {complete: req.body.complete}},
		function(err, note){
			res.send(note);
		});
});

//DELETE Delete a sticky note
router.delete('/:id', function(req, res){
	Note.findById(req.params.id, function(err, note){
		note.remove();
		res.status(200).send({success: true});
	});
});

module.exports = router;