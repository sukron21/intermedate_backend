// deklare exprees
const express = require('express')
const { list, destroy, detail, insert, update, detailname } = require('../controller/recipe.controller')
const upload =require ('../middleware/upload');
const remove= require('../middleware/deletefile')

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
  .post('/recipes/tambah',upload, insert)
  .put('/recipes/:id', update)
  .delete('/recipes/:id', destroy)

module.exports = router
