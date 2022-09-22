const komenModel = require('../model/comment.model')
const komenController = {
  // method
  list: (req, res) => {
    komenModel
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
    komenModel
      .selectDetail(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detailname: (req, res) => {
    const id = req.params.id_recipe
    komenModel
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
    const { id, comments, id_user, id_recipe } = req.body
    komenModel
      .store(id, comments, id_user, id_recipe)
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
    const { comments, id_user, id_recipe } = req.body
    komenModel
      .updateAccount(id, comments, id_user, id_recipe)
      .then((result) => {
        res.json('Account Updated')
      })
      .catch((err) => {
        res.json(err)
      })
  },
  destroy: (req, res) => {
    komenModel
      .delete(req.params.id)
      .then((result) => {
        res.json('Account Deleted')
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = komenController
