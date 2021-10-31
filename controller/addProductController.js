const addProductValidCheck = require('../validator/addProductValidator')
const productModel = require('../model/productModel')
const saveData = require('../model/saveData')

module.exports = {
    getAll(req,res){

        productModel.find()
            .then(result =>{
                if (result.length === 0) {
                    res.status(201).json({
                        message:'No data available..?'
                    })
                }else{
                    res.status(200).json(result)
                }
            })
            .catch(error =>{
                console.log(error);
                res.status(400).json({
                    message:'No product available...?'
                })
            })
    },
    addProduct(req,res){
        const picName=req.file.filename
        let {name,category,price}=req.body
        console.log('This is picname',picName);
        console.log('Other',name,category,price);
        
        const validProduct =addProductValidCheck({name,category,price,picName})
        if (!validProduct.isValid) {
            return res.status(400).json(validProduct.error)
        }else{

            const product = new productModel({
                name,
                category,
                price,
                image:picName
            })
            product.save()
                .then(result =>{
                    res.status(201).json({
                        message: "Product added successfully....",
                        product:result
                    })
                })
                .catch(error =>{
                    console.log(error);
                })
        }
        
    },
    getSingleProduct(req,res){
        let id =req.params.id
        productModel.findById(id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error =>{
                console.log(error);
            })
    },
    orderProduct(req,res){
        let id =req.params.id
        productModel.findById(id)
            .then(result => {
                res.status(200).json({
                    message:'This is single order',
                    order:result
                })
               
            })
            .catch(error =>{
                console.log(error);
            })
    },
    allOrder(req,res){
        let {name,email,phone,address,order,cardNumber,cardMonth,cardYear} = req.body
        const saveInfo = new saveData({
            name,
            email,
            phone,
            address,
            order:order,
            cardNumber,
            cardMonth,
            cardYear
        })
        saveInfo.save()
            .then(result =>{
                res.status(201).json({
                    message:'All product save successfully..!'
                })
            })
            .catch(error =>{
                console.log(error);
            })
    }

}