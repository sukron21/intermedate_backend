const recipeModel = require('../model/recipe.model')
const recipeController = {
  // method
  list: (req, res) => {
    recipeModel
      .selectAll()
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    recipeModel
      .selectDetail(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detailname: (req, res) => {
    const id = req.params.nama_recipe
    recipeModel
      .nameDetail(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  insert: (req, res) => {
    // eslint-disable-next-line camelcase
    const {nama_recipe, ingredients,tanggal_dibuat } = req.body
    recipeModel
      .store( nama_recipe, ingredients,tanggal_dibuat)
      .then((result) => {
        res.json('Account added successfully')
      })
      .catch((err) => {
        res.json(err)
      })
  },
  update: (req, res) => {
    const id = req.params.id
    // eslint-disable-next-line camelcase
    const { nama_recipe, ingredients } = req.body
    recipeModel
      .updateAccount(id, nama_recipe, ingredients)
      .then((result) => {
        res.json('Account Updated')
      })
      .catch((err) => {
        res.json(err)
      })
  },
  destroy: (req, res) => {
    recipeModel
      .delete(req.params.id)
      .then((result) => {
        res.json('Account Deleted')
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController
