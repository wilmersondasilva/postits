Note = require('../models/').Note

module.exports = {

	// CRUD Operations

	list(req, res) {
		Note.findAll()
			.then(function(posts) {
				res.status(200).json(posts)
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	get(req, res) {
		Note.findById(req.params.id)
			.then(function(post) {
				if (!post) {
					res.status(404).json({ error: 'Object Not Found.' })
				} else {
					res.status(200).json(post)
				}
				console.log("Aqui então")
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	create(req, res) {
		Note.create(req.body)
			.then(function(newNote) {
				res.status(200).json(newNote)
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	update(req, res) {
		Note.update(req.body, { where: { id: req.params.id } })
			.then(function(updatedNote) {
				res.status(200).end();
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	delete(req, res) {
		Note.destroy({ where: { id: req.params.id } })
			.then(function(deletedNote) {
				res.status(204).end(); // Code 204: No Content
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	}
}
