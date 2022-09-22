// deklare exprees
const express = require('express')
const { list, destroy, detail, insert, update, detailname } =
  require('../controller/comment.controller')

const router = express.Router()

router
  .get('/komen', list)
  .get('/komen/:id', detail)
  .get('/komen/:id_recipe', detailname)
  .post('/komen/tambah', insert)
  .put('/komen/:id', update)
  .delete('/komen/:id', destroy)

module.exports = router
