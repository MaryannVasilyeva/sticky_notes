$(document).ready(function(){
	function getAllNotes(){
		$.ajax({
			url: '/notes',
			type: 'GET',
			dataType: 'JSON'
			}).done(function(data){
				updateNoteList(data);
			}).fail(function(data){
				console.log(data);
			});
	}

	function updateNoteList(notes){
		var list = $('#notes_list');
		list.empty();
		notes.forEach(function(note){
			$.ajax({
				url: '/notes/notes_template',
				type: 'POST',
				dataType: 'HTML',
				data: {id: note._id, title: note.title, complete: note.complete}
			}).done(function(data){
				list.append(data);
			}).fail(function(data){
				console.log(data);
			});
		});
	}
	getAllNotes();

	$('#add_note').on('submit', function(e){
		e.preventDefault();
		var input = $(this).children('input:first');

		$.ajax({
			url: '/notes',
			type: 'POST',
			data: {title: input.val()},
			dataType: 'JSON'
		}).done(function(data){
			input.val('');
			console.log(data);
			getAllNotes();
		}).fail(function(data){
			console.log(data);
		});
	});

	$(document).on('change', '#notes_list input', function(){
		var input = $(this);
		var url = '/notes/' + input.attr('id');

		$.ajax({
			url: url,
			type: 'PUT',
			data: { complete: input.is(':checked') }
		}).done(function(data){
			input.closest('.row').find('.title').toggleClass('checked');
		}).fail(function(msg){
			alert('Somethings wrong');
			input.attr('checked', !input.is(':checked'));
		});
	});

	$(document).on('click', '.remove-note', function(){
		var url = '/notes/' + $(this).data('id');

		$.ajax({
			url: url,
			type: 'DELETE',
			dataType: 'JSON'
		}).done(function(data){
			getAllNotes();
		}).fail(function(msg){
			console.log(msg);
		});
	});

});











