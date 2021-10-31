const router = require('express').Router();
const {getSingleProduct,addProduct,getAll,orderProduct,allOrder} =require('../controller/addProductController')
const upload =require('../multer/multer')


router.get('/show',getAll)

router.post('/',upload.single("avatar"),addProduct)

router.get('/:id',getSingleProduct)
router.get('/order/:id',orderProduct)
router.post('/allOrder',allOrder)

module.exports = router