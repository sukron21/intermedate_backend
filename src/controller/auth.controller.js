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
    login : (req,res)=>{
      const {username, password}= req.body
      userModel.checkUsername(username).then((result)=>{
        // console.log(res);
        const user = result.rows[0];
        if (result.rowCount>0){
          bcrypt.compare(password, result.rows[0].password).then(async(result)=>{
            if(result){
              const token = await jwtToken({
                username : user.username,
                level:user.level
              })
              // console.log(token)
              succesWithToken(res,token, 'succes', 'login succes');
            } else {
              failed(res,null,'failed','username atau password salah')
            }
          })
        }else {
          // ketika username salah
          failed(res,null,'failed','username salah')
        }
      }).catch((err)=>{
        failed(res,null,'failed','internal server salah')
      })
    }
}