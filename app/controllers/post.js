Post = require('../models/').Post

module.exports = {

	list(req, res) {
		Post.findAll()
			.then(function(posts) {
				res.status(200).json(posts)
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	get(req, res) {
		Post.findById(req.params.id)
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
		console.log(req.body)
		Post.create(req.body)
			.then(function(newPost) {
				res.status(200).json(newPost)
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	update(req, res) {
		Post.update(req.body, { where: { id: req.params.id } })
			.then(function(updatedPost) {
				res.status(200).json(updatedPost)
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	},

	delete(req, res) {
		Post.destroy({ where: { id: req.params.id } })
			.then(function(deletedPost) {
				res.status(200).json(deletedPost)
			})
			.catch(function(error) {
				res.status(500).json(error)
			})
	}
}