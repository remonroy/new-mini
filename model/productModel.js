const mongoose = require('mongoose')
const Schema =mongoose.Schema

const addProduct = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    category:{
        type:String
    },
    price:Number,
    image:{
        type:String,
    }
})
const Product = mongoose.model('Product',addProduct)

module.exports = Product ;