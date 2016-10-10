var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

var models = require('./app/models')
var note = require('./app/controllers/note')

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

app.route('/api/notes')
	.get(note.list)
	.post(note.create)

app.route('/api/notes/:id')
	.get(note.get)
	.put(note.update)
	.delete(note.delete)

app.get('*', function(req, res) { // "route 404"
	res.render('index')
})

app.listen(app.get('port'), function () {

	models.sequelize.authenticate()
		.then(function() {
			console.log('Database: Connection successful')
			models.sequelize.sync().then(function() { // Update database
				console.log('Database sync successful')
			})
		})
		.catch(function(error) {
			console.log('Database: Error creating connection: ', error)
		})

	console.log("Application running on port ", app.get('port'))
})
