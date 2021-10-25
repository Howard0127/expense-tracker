const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Record = require('./models/record')
const Category = require('./models/Category')

const app = express()

mongoose.connect('mongodb://localhost/expense-tracker')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})

app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.error(err))
})

app.post('/records', (req, res) => {
  console.log(req.body)
  const { name, date, category, amount } = req.body
  Record.create({
    name,
    date,
    category,
    amount
  }) 
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

