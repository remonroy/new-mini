const registerValidator = require('../validator/userRegisValidator');
const loginValidator = require('../validator/loginUserValidation');
const User = require('../model/userModel');
const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {serverError,resourceError}= require('../util/error');

module.exports = {
    login(req,res){
        let {email,password} = req.body
        const validate = loginValidator({email,password})
        if (!validate.isValid) {
            res.status(400).json(validate.error)
        }
        User.findOne({email})
            .then(user =>{
                if (!user) {
                    return resourceError(res,'User not found..')
                }
                bcrypt.compare(password, user.password,(err, result)=>{
                    if (err) {
                        return serverError(res,err)
                    }
                    if (!result) {
                        return resourceError(res,"Login password Doesn\'t match")
                    }
                    const token = jwt.sign({
                       _id:user._id,
                       name:user.name,
                       email:user.email,
                    },'SECRET',{ expiresIn: '2h' })

                    res.status(200).json({
                        message:'User login successful',
                        token:`Bearer ${token}`
                    })
                });
            })
            .catch(error =>serverError(res,error))
    },
    userRegister(req,res){
        let {name,email,password,confirmPassword} = req.body
        const validate = registerValidator({name,email,password,confirmPassword})
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }else{
            User.findOne({email})
                .then(user =>{
                    if (user) {
                        return resourceError(res,'User already exits..?')
                    }
                    bcrypt.hash(password, 11,(err, hash)=>{
                        if (err) {
                            return serverError(res,error)
                        }
                        let user = new User({
                            name,
                            email,
                            password:hash
                        })
                        user.save()
                            .then(user =>{
                                res.status(201).json({
                                    message:'User created successfully...',
                                    user:user
                                })
                            })
                            .catch(error =>serverError(res,error))
                    });
                })
                .catch(error =>serverError(res,error))
        }
        
    }
}
