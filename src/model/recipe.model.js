/* eslint-disable camelcase */

const db = require('../config/db')
const recipeModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe ORDER BY nama_recipe', (err, result) => {
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
      db.query(`SELECT *FROM recipe where id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  nameDetail: (nama_recipe) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from recipe where nama_recipe='${nama_recipe}'`,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  // router - insert
  store: ( nama_recipe, ingredients,tanggal_dibuat,image) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO recipe (nama_recipe,ingredients,tanggal_dibuat,image)
            VALUES
            ('${nama_recipe}','${ingredients}','${tanggal_dibuat}','${image}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
      )
    })
  },
  updateAccount: (id, nama_recipe, ingredients) => {
    return new Promise((resolve, reject) => {
      db.query(
            `
              UPDATE recipe SET
              nama_recipe = COALESCE('${nama_recipe}', nama_recipe),
              ingredients = COALESCE('${ingredients}', ingredients)
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
      db.query(`DELETE FROM recipe WHERE id = ${id};`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

}
module.exports = recipeModel
