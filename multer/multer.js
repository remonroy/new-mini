const multer = require('multer')
const path =require('path')


const UPLOADS_FILE = 'productImage'

const storage = multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,UPLOADS_FILE)
    },
    filename:(req,file,cd)=>{
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
                        .replace(fileExt,"")
                        .toLowerCase()
                        .split(" ")
                        .join("-") + "-" + Date.now()
        cd(null,fileName + fileExt)
    }
})

const upload = multer({
    storage:storage,
    // dest:storage,
    limits:{
        fileSize:1000000, //1MB file
    },
    fileFilter:(req,file,cd)=>{
        if (file === 0) {
            new Error('file is empty')
        }else{
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/png'
            ){
                cd(null,true)
            }else{
                cd(new Error('Only uploaded jpeg,png or jpg...!'))
            }
        }
    }
})
module.exports = upload