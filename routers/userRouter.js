const router = require('express').Router()
const {login,userRegister} =require('../controller/userController')


router.post('/register',userRegister)

router.post('/login',login)

module.exports = router