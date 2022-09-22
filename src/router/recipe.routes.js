// deklare exprees
const express = require('express')
const { list, destroy, detail, insert, update, detailname } = require('../controller/recipe.controller')
const remove= require('../middleware/delete_recipe')
const upload_recipe = require('../middleware/upload_recipe');

const router = express.Router()

// router
// .get('/',(req,res)=>{
//     const data = [1,2,3,4]
//     res.json(data);
// })
router
  .get('/recipes', list)
  .get('/recipes/:id', detail)
  .get('/nama/:nama_recipe', detailname)
  .post('/recipes/tambah',upload_recipe, insert)
  .put('/recipes/:id',remove,insert, update)
  .delete('/recipes/:id',remove, destroy)

module.exports = router
