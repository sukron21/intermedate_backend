/* eslint-disable camelcase */
const db = require('../config/db')
const komenModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM comment', (err, result) => {
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
      db.query(`SELECT *FROM comment where id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  nameDetail: (id_recipe) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from comment where id_recipe='${id_recipe}'`,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  // router - insert
  store: (id, comments, id_user, id_recipe) => {
    return new Promise((resolve, reject) => {
      db.query(`
              INSERT INTO comment (id,comments,id_user,id_recipe)
              VALUES
              (${id}, '${comments}',${id_user},${id_recipe})
              `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
      )
    })
  },
  updateAccount: (id, comments, id_user, id_recipe) => {
    return new Promise((resolve, reject) => {
      db.query(
              `
                UPDATE comment SET
                comments = COALESCE('${comments}', comments),
                id_user = COALESCE('${id_user}', id_user),
                id_recipe = COALESCE('${id_recipe}', id_recipe)
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
      db.query(`DELETE FROM comment WHERE id = ${id};`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

}
module.exports = komenModel
