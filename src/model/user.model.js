/* eslint-disable camelcase */

const db = require('../config/db')
const userModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users ORDER BY username ASC', (err, result) => {
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
      db.query(`SELECT * FROM users where id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  nameDetail: (username) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where username='${username}'`,
        (err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })
  },
  // router - insert
  store: (username, email,phone,password,level) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO users (username, email,phone,password,level)
            VALUES
            ('${username}', '${email}','${phone}','${password}',${level})
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
      )
    })
  },
  register:({username,email, phone, password, level,image})=>{
    return new Promise((resolve,reject)=>{
        db.query(`insert into users (username,email, phone, password, level,image) 
        values
        ('${username}','${email}','${phone}','${password}',${level},'${image}')`,(err,res)=>{
            if (err) {
                reject(err)
              }
              resolve(res)
        })
    })
  }, 
  checkUsername:(username)=>{
    return new Promise((resolve, reject)=>{
      db.query(`select * from users where username='${username}'`, (err, result)=>{
        if (err) {
          reject(err)
        }
        resolve(result);
      })
    })
  },  
  updateAccount: ({id,username, email,phone,password,level,image}) => {
    return new Promise((resolve, reject) => {
      // UPDATE users SET
        
      //         image = COALESCE('${image}', image)
      //         WHERE id = ${id}
      // username = COALESCE('${username}', username),
      // email = COALESCE('${email}', email),
      // phone = COALESCE('${phone}', phone),
      // password = COALESCE('${password}', password),
      db.query(
            `UPDATE tb_users SET name = '${username}', email = '${email}', phone = '${phone}', password = '${password}',password = ${level},password = '${image}' WHERE id = ${id}`, (err, result) => {
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
      db.query(`DELETE FROM users WHERE id = ${id};`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

}
module.exports = userModel
