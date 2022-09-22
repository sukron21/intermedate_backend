const recipeModel = require('../model/recipe.model')
const {succes,failed, success} = require('../helper/response')
const userModel = require('../model/user.model')
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
  insert:(req, res)=>{
try{
  const{nama_recipe,ingredients,tanggal_dibuat}=req.body;
  const image=req.file.filename
    const data={
      nama_recipe,
      ingredients,
      tanggal_dibuat,
      image
    }
    console.log(data);
    userModel.store(data).then((result)=>{
      success(res,result, 'success','register succes')
    }).catch((err)=>{
      failed(res,err.message,'failed','register fail')
    })


  }catch(err){
    failed(res,err.message,'failed','internal server error')
  }
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
