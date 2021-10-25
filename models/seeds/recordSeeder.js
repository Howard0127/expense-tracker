const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://localhost/expense-tracker')

const recordData = require('./record.json')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Record.insertMany(recordData)
  console.log('recordSeeder done!')
})

