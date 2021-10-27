const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'desc' })
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

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      console.log(record)
      Category.find()
        .lean()
        .then(categories => {
          // 替除掉本來已選的分類後，傳入edit.hbs
          const restCategories = categories.filter(item => item.name !== record.category)
          return res.render('edit', { record, restCategories })
        })
    })
    .catch(err => console.log(err))
})

app.put('/records/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndUpdate({ _id }, {$set: req.body})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndRemove({ _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

