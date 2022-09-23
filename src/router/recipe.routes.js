// deklare exprees
const express = require('express')
const { list, destroy, detail, insert, update, detailTitle } = require('../controller/recipe.controller')
const remove= require('../middleware/delete_recipe')
const upload = require('../middleware/upload_recipe');

const router = express.Router()

// router
// .get('/',(req,res)=>{
//     const data = [1,2,3,4]
//     res.json(data);
// })
router
  .get('/recipes', list)
  .get('/recipes/:id', detail)
  .get('/nama/:nama_recipe', detailTitle)
  .post('/recipes/tambah',upload, insert)
  .put('/recipes/:id',remove,upload,update)
  .delete('/recipes/:id',remove,destroy)
  .delete('/recipes1/:id', destroy)
  

module.exports = router
