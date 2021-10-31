const addProductValidator = product=>{
    const dataName =product.name
    const data =product.price
    
    const error = {}
    if (!product.name ==='undefined') {
        error.name = 'Provide a product name..'
    }
    
    if (typeof dataName === 'number') {
        error.name = 'Provide a valid product name..'
    }
    if (!product.price) {
        error.price = 'Provide a product price..'
    }
    if (!product.picName) {
        error.picName = 'Provide a product pic..'
    }
    // if(typeof data !== 'number'){
    //     error.price = 'Provide a valid price..'
    // }
   
    return{
        
        error,
        isValid:Object.keys(error).length === 0
    }
}
module.exports = addProductValidator