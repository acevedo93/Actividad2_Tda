const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

//port 
const port = process.env.PORT || 3000;

//app
const app = express()
const courseRoutes = require('./routes/course.routes')
const userRoutes = require('./routes/user.routes')

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//static Files
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

//Views
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "pug")

//routes
app.use('/courses', courseRoutes);
app.use('/users', userRoutes)

//handle Error route
app.get('/', (req, res, next) => {
    res.redirect('/courses')
})


const listen = app.listen(port, () => {
    console.log(`Escuchando en puerto ${listen.address().port}`)
})