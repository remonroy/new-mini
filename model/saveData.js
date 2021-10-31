const mongoose = require('mongoose')
const Schema = mongoose.Schema

const allSaveData = new Schema({
    name:String,
    email:String,
    phone:String,
    address:String,
    order:{},
    cardNumber:String,
    cardMonth:String,
    cardYear:String
})
const saveInfo = mongoose.model('OrderInformation',allSaveData)
module.exports = saveInfo