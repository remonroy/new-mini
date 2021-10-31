const validator = require('validator')

const validate = user =>{
    let error = {}

    if (!user.name) {
        error.name = "Provide your name.."
    }
    if (!user.email) {
        error.email = "Provide your email.."
    }else if(!validator.isEmail(user.email)){
        error.email = "Provide your valid email.."
    }
    if (!user.password) {
        error.password = "Provide your password.."
    }else if(user.password.length < 6){
        error.password = "Provide your 6 character password.."
    }
    if (!user.confirmPassword) {
        error.confirmPassword = "Provide your confirmPassword.."
    }else if(user.confirmPassword !== user.password){
        error.confirmPassword = "Password Doesn\'t match.."
    }
    return {
        error,
        isValid:Object.keys(error).length === 0
    }
}
module.exports = validate