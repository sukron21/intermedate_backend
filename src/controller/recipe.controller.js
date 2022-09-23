const recipeModel = require('../model/recipe.model')
const {success, failed} = require('../helper/response')
const recipeController = {
  // metod
  list: (req, res) => {
    recipeModel.selectAll()
      .then((results) => {
        success(res, results, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    recipeModel.selectDetail(id).then((results) => {
      res.json(results.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    try {
      //image
      const image = req.file.filename
      //tangkap data dari body
      const {nama_recipe, ingredients} = req.body;

          const data = {
              nama_recipe,
              ingredients,
              image
          }

          recipeModel.store(data).then((result) => {
              success(res, result, 'success', 'upload recipe success')

          }).catch((err) => {
              failed(res, err.message, 'failed', 'upload recipe failed')
          })
        } catch(err) {
      failed(res, err.message, 'failed', 'internal server error');
  }
  },
  update: (req, res) => {
    const { nama_recipe, ingredients} = req.body
    const id = req.params.id
    const image = req.file.filename
    recipeModel.updateAccount(id, nama_recipe, ingredients, image).then((results) => {
      success(res, results, 'success', 'update recipe success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update recipe failed')
    })
  },
  destroy: (req, res) => {
    const id = req.params.id;
    recipeModel
      .delete(id)
      .then((result) => {
        success(res, result, 'success', 'success delete data');
      })
      .catch((err) => {
        failed(res, err, 'failed', 'failed delete data');
      });
  },
  detailTitle: (req, res) => {
    const nama_recipe = req.params.nama_recipe
    recipeModel.detailTitle(nama_recipe).then((results) => {
        res.json(results.rows)
      }).catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController