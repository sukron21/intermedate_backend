require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');


//buat route
const komenRouter = require ('./src/router/comment.routes.js');
const recipeRouter = require ('./src/router/recipe.routes.js');
const userRouter = require ('./src/router/user.routes.js');

const app=express();
app.use(bodyParser.json());
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(xss())
app.use(cors())

app.use(userRouter)
app.use(recipeRouter)
app.use(komenRouter)

//jalankan express
app.listen(3001,()=>{
    console.log('Service Running on port 3001');
})