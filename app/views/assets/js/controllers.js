'use strict';
angular.module('postits')
	.controller('homeCtrl', homeCtrl)

	function homeCtrl($scope, noteService) {
		var _note = {
			content: 'Type content postit here'
		}

		listNotes();

		$scope.addNote = function() {
			$scope.notes = [0].concat($scope.notes);
			$scope.notes[0] = angular.copy(_note);
		}

		$scope.updateModel = function(note) {
			console.log(note.content);
		}

		$scope.focusNewNote = function(note) {			
			console.log(note.content);
			if (note.content == _note.content) {
				note.content = ''
			}
		}

		$scope.blurNewNote = function(note) {

			if (!note.content && !note.id) {
				$scope.notes.splice(0, 1);
			}

			if (!note.content && note.id) {
				removeNote(note);
			}

			if (note.content && !note.id) {
				saveNote(note);
			}

			if (note.content && note.id) {
				updateNote(note);
			}
		}

		function listNotes() {
			noteService.list()
				.success(function(data) {
					$scope.notes = data;
				})
				.error(function(error) {
					console.log('Request error: ', error);
				});
		}

		function saveNote(note) {
			noteService.save(note)
				.success(function(data) {
					console.log('removed');
					listNotes();	
				})
				.error(function(error) {
					console.log('Request error: ', error);	
				});
		}

		function updateNote(note) {
			noteService.update(note)
				.success(function(data) {
					console.log('updated');
				})
				.error(function(error) {
					console.log('Request error: ', error);	
				});
		}

		function removeNote(note) {
			noteService.remove(note)
				.success(function(data) {
					console.log('removed');
					listNotes();	
				})
				.error(function(error) {
					console.log('Request error: ', error);	
				});
		}

	}
