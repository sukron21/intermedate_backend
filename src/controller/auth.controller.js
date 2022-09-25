const userModel= require('../model/user.model');
const {success, failed, succesWithToken}= require('../helper/response');

const bcrypt= require('bcrypt');
const jwtToken = require('../helper/generateJWT')
module.exports={
    register:(req, res)=>{
        try{
        const{username,email,phone, password, level}= req.body;
        const image=req.file.filename
        bcrypt.hash(password,10,(err,hash)=>{
            if (err) {
                failed(res,err.message, 'failed','fail hash password')
              }
              const data={
                username,
                email,
                phone,
                password: hash,
                level,
                image
              }
              userModel.register(data).then((result)=>{
                success(res, result, 'success','register success')
              }).catch((err)=>{
                failed(res, err.message,'failed','register fail')
              })

            })
        
        }catch(err){
            failed(res, err.message,'failed','internal server error')
            }
    },
    login: async (req, res) => {
      const {email, password} = req.body;
      userModel.checkUEmail(email).then((result) => {
          // console.log(res.rows[0]);
          const user = result.rows[0];
          if(result.rowCount > 0) {
              bcrypt.compare(password, result.rows[0].password).then(async (result) => {
                  if(result) {
                      const token = await jwtToken({
                        email: user.email,
                          level: user.level
                      })
                      console.log(token);
                      succesWithToken(res, token, "success", "login success");
                  } else {
                      // ketika password salah
                      failed(res, null, 'failed', 'username or password is wrong');
                  }
              })
          } else {
              //ketika username salah
              failed(res, null, 'failed', 'username wrong');
          }
      }).catch((err) => {
          failed(res, err, 'failed', 'internal server error');
      })
  }
}