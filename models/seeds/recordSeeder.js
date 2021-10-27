const Record = require('../record')
const recordData = require('./record.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  Record.insertMany(recordData)
  console.log('recordSeeder done!')
})

