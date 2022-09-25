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
  updateAccount: (id,username, email,phone,password,level,image) => {
    return new Promise((resolve, reject) => {
      db.query(
       ` UPDATE users SET
        username = COALESCE ($1, username),
        email = COALESCE ($2, email),
        phone = COALESCE ($4, phone),
        password = COALESCE ($3, password),
        level = COALESCE ($5, level),
        image = COALESCE ($6, image)  
        WHERE id = $7
        `,
        [username, email, password, phone, level, image, id],(err, res) => {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
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
  },
  checkUEmail:(email)=>{
    return new Promise((resolve, reject)=>{
      db.query(`select * from users where email='${email}'`, (err, result)=>{
        if (err) {
          reject(err)
        }
        resolve(result);
      })
    })
  },  

}
module.exports = userModel
