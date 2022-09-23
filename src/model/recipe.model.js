/* eslint-disable camelcase */

const db = require('../config/db')
const recipeModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes_web ORDER BY nama_recipe', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT *FROM recipes_web where id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  nameDetail: (nama_recipe) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from recipes_web where nama_recipe='${nama_recipe}'`,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  // router - insert
  store: ( {nama_recipe, ingredients,image}) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO recipes_web (nama_recipe,ingredients,image)
            VALUES
            ('${nama_recipe}','${ingredients}','${image}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
      )
    })
  },
  updateAccount: (id, nama_recipe, ingredients,image) => {
    return new Promise((resolve, reject) => {
      db.query(
            `
              UPDATE recipes_web SET
              nama_recipe = COALESCE('${nama_recipe}', nama_recipe),
              ingredients = COALESCE('${ingredients}', ingredients),
              image = COALESCE('${image}', image)
              WHERE id = ${id}
              `,
            (err, res) => {
              if (err) {
                reject(err)
              }
              resolve(res)
            }
      )
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM recipes_web WHERE id = ${id};`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

}
module.exports= recipeModel
