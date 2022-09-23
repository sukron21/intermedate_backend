const fs = require("fs");
const recipeModel = require("../model/recipe.model");

const removeRecipe = async (req, res, next) => {
  const id = req.params.id;
  const data = await recipeModel.selectDetail(id);
  if (data.rows[0].image) {
    const image = data.rows[0].image;
    fs.unlink(`./public_gambar/${image}`, (err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
    next();
  } else {
    res.json("Not found image");
  }
};

module.exports = removeRecipe;