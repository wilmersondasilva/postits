var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

var models = require('./app/models')
var post = require('./app/controllers/post')

var app = express()

// Enviroment Variables
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'pug')
app.set('views', './app/client')

// Middlewares
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static('./app/client'));

app.get('/', function(req, res) {
	res.render('index')
})

app.route('/api/posts')
	.get(post.list)
	.post(post.create)

app.route('/api/posts/:id')
	.get(post.get)
	.put(post.update)
	.delete(post.delete)

app.listen(app.get('port'), function () {

	models.sequelize.authenticate()
		.then(function() {
			console.log('Database: Connection successful')
			models.sequelize.sync().then(function() {
				console.log('Database sync successful')
			})
		})
		.catch(function(error) {
			console.log('Database: Error creating connection: ', error)
		})

	console.log("Magic happens on port", app.get('port'))
})
