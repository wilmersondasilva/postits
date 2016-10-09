'use strict';
angular.module('postits')
	.factory('noteService', noteService)

	function noteService($http, APIURL) {

		function list() {
			return $http.get(APIURL)
		}

		function save(note) {
			return $http.post(APIURL, note)
		}

		function update(note) {
			return $http.put(APIURL + note.id, note)
		}

		function remove(note) {
			return $http.delete(APIURL + note.id)
		}

		return {
			list: list,
			save: save,
			update: update,
			remove: remove
		}
	}
