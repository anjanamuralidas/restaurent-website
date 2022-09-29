const express = require('express')
const bodyparser = require('body-parser')
const indexRouter = require('./src/routes/indexrouter')
const aboutRouter = require('./src/routes/aboutrouter')
const menuRouter = require('./src/routes/menurouter')
const newsRouter = require('./src/routes/newsrouter')
const contactRouter = require('./src/routes/contactrouter')
const loginRouter = require('./src/routes/loginroutes')

const app = express()
app.set('view engine', 'ejs') //setting the view engine-ejs file-html css
app.engine('ejs', require('ejs').__express);
app.set('views', './src/views') //setting path
app.use(express.static('./public')) //for static files like images
app.use(bodyparser.urlencoded({ extended: true }))
app.use('/index', indexRouter)
app.use('/about', aboutRouter)
app.use('/menu', menuRouter)
app.use('/news', newsRouter)
app.use('/menucategory', contactRouter)
app.use('/login', loginRouter)

app.get('/', function(req, res) {
    res.render("login", {
        title: 'restuarent',

    })

})

app.listen(3003, () => console.log('function is started on port 3000'))