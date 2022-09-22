//import multer

const multer = require('multer');
//import patch
const path = require('path');

//management file
const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './public')
        },
        filename: (req,file,cb)=>{
            const ext = path.extname(file.originalname);

            const fileName = Date.now() + '' + ext;
            cb(null,fileName);
        }
    }),
    limits:{
        fieldNameSize:300,
        fileSize:2 * 1024 * 1024,
    },

    fileFilter: (req,file,cb)=>{
        const ext = path.extname(file.originalname);
        // consol.log(ext);
        if(ext==='.jpg' || ext ==='.png'){
            cb(null,true)
  
        }else {
            const error={
                meesage:'file mus be jpg or png'    
            }
            cb(error, false)
        }
    }
})

// untuk middleware
const upload = (req,res,next)=>{
    const multerSingle = multerUpload.single ('image')
    multerSingle(req,res, (err)=>{
        if (err){
            res.json({
            message : 'err',
            error:err
        })
        }else {
            next()
        }
    })
}

module.exports = upload;