require('dotenv').config()
// deklare exprees
const express = require('express')
const { list, destroy, detail, insert, update, detailname } = require('../controller/user.controller')
const{register, login}=require('../controller/auth.controller')
const{isAdmin, isCustomer}= require('../middleware/authorization')
const jwtAuth = require ('../middleware/jwtAuth.js');
const upload =require ('../middleware/upload');
const remove= require('../middleware/deletefile')

const router = express.Router()

// router
// .get('/',(req,res)=>{
//     const data = [1,2,3,4]
//     res.json(data);
// })
router
  .get('/',jwtAuth,isCustomer, list)
  .get('/1', list)
  .get('/user/:id', detail)
  .get('/user1/:username', detailname)
  .post('/user2/tambah', insert)
  .put('/user/:id',remove,upload,update)
  .delete('/user/:id',remove, destroy)
  // .delete('/user4/:id', remove)
  

   //register
   .post('/register',upload , register)
   //login
   .post('/login',login)

module.exports = router
