const Category = require('../category')
const db = require('../../config/mongoose')

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

db.once('open', () => {
  Category.insertMany(categoryData)
  console.log('categorySeeder done!')
})