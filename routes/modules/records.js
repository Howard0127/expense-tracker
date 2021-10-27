const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/Category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.error(err))
})

router.post('/', (req, res) => {
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

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
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

router.put('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndUpdate({ _id }, {$set: req.body})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndRemove({ _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router