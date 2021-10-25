const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect('mongodb://localhost/expense-tracker')

const db = mongoose.connection

const categoryData = [
  {
    'name': '家居物業',
    'icon': '<i class="fas fa-home fa-lg"></i>'
  },
  {
    'name': '交通出行',
    'icon': '<i class="fas fa-shuttle-van fa-lg"></i>'
  },
  {
    'name': '休閒娛樂',
    'icon': '<i class="fas fa-grin-beam fa-lg"></i>'
  },
  {
    'name': '餐飲食品',
    'icon': '<i class="fas fa-utensils fa-lg"></i>'
  },
  {
    'name': '其他',
    'icon': '<i class="fas fa-pen fa-lg"></i>'
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Category.insertMany(categoryData)
  console.log('categorySeeder done!')
})