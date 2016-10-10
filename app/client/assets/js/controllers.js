'use strict';
angular.module('postits')
	.controller('homeCtrl', homeCtrl)

	function homeCtrl($scope, noteService) {

		listNotes(); // List all notes

		$scope.addNote = function() {
			delete $scope.noteFilter;
			$scope.notes = [0].concat($scope.notes); // Faster than to use 'unshift' method
			$scope.notes[0] = {}; // Insert element in the start of array
		}

		$scope.blurNote = function(note) {

			if (!note.content && !note.id) { // New note with no content must be removed from array
				$scope.notes.splice(0, 1);
			}

			if (!note.content && note.id) { // Old note with no content must be removed from database
				removeNote(note);
			}

			if (note.content && !note.id) { // New note with content must be saved
				saveNote(note);
			}

			if (note.content && note.id) { // Old note with content must be updated
				updateNote(note);
			}
		}

		// CRUD Operations

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
					console.log(data, 'saved');
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
