const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      Promise.all(Array.from(records, record => {
        Category.findOne({ name: record.category })
          .then(category => record.icon = category.icon)
        return totalAmount += record.amount
      }))
      Category.find()
        .lean()
        .then(categories => {

          return res.render('index', { records, categories, totalAmount })
        })
    })
    .catch(err => console.error(err))
})

//首頁顯示所點選的類別的支出項目
// router.get('/:category', (req, res) => {
//   const category = req.params.category
//   Record.find({ category })
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => {
//       let totalAmount = 0
//       Promise.all(Array.from(records, record => {
//         Category.findOne({ name: record.category })
//           .then(category => record.icon = category.icon)
//         return totalAmount += record.amount
//       }))
//       Category.find()
//         .lean()
//         .then(categories => {
//           return res.render('index', { records, categories, category, totalAmount })
//         })
//     })
//     .catch(err => console.error(err))
// })

module.exports = router 
