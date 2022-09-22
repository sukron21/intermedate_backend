const userModel = require('../model/user.model');
const {succes,failed, success}= require('../helper/response');

const userController = {
  // method
  list: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        success(res, result, 'success','get all user succes')
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message,'failed','get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    userModel
      .selectDetail(id)
      .then((result) => {
        success(res, result, 'success','by id user success')
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message,'failed','by id user failed')
      })
  },
  detailname: (req, res) => {
    const name = req.params.username
    userModel
      .nameDetail(name)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  insert: (req, res) => {
    // eslint-disable-next-line camelcase
    const {  username, email,phone,password,level,image } = req.body
    userModel
      .store( username, email,phone,password,level,image)
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
    const { username,email,phone,password,level } = req.body
    userModel
      .updateAccount(id,username,email,phone,password,level)
      .then((result) => {
        res.json('Account Updated')
      })
      .catch((err) => {
        res.json(err)
      })
  },
  destroy: (req, res) => {
    userModel
      .delete(req.params.id)
      .then((result) => {
        res.json('Account Deleted')
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = userController
