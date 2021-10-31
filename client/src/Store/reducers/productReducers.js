import * as Types from '../actions/types'

const init = {
    product:[],
    error:{},
    singleProducts:[]
}
    
export const productReducers =(state=init,action)=>{
    switch(action.type){
        case Types.LOAD_PRODUCT:{
            return {
                product:action.payload.product,
                error:{}
            }
        }
        case Types.SINGLE_PRODUCT:{
            return {
               ...state,
                singleProducts:action.payload.products
            }
        }
        case Types.PRODUCT_ERROR:{
            return {
                ...state,
                error:action.payload.error
            }
        }
        default : return state
    }
}
const production={
    product:{},
    
}
export const oderProduct = (state=production,action) => {
    switch(action.type){
        case Types.ORDER_PRODUCT:{
            let cart = state.product;
            let order = action.payload.order
            if (Object.keys(cart).length == 0) {
                cart = {
                    items: {},
                    totalPrice: 0,
                    totalQty: 0
                }
            }
            if (!cart.items[order._id]) {
                cart.items[order._id] = {
                    item: order,
                    qty: 1
                }
                cart.totalPrice = cart.totalPrice + order.price;
                cart.totalQty = cart.totalQty + 1
            } else {
                cart.items[order._id].qty = cart.items[order._id].qty + 1;
                cart.totalPrice = cart.totalPrice + order.price;
                cart.totalQty = cart.totalQty + 1;
            }
            localStorage.setItem('order',JSON.stringify(cart))
            return { product: cart }   
        }
        case Types.SHOW_LOCAL_PRODUCT:{
            return {product:action.payload.info}    
        }
        case Types.LOCAL_PRODUCT_DELETE:{
           let cart = state.product
           let id = action.payload.id
           let qty = cart.items[id].qty
           let price = cart.items[id].item.price
           cart.totalQty = cart.totalQty - qty
           cart.totalPrice = cart.totalPrice -(price * qty)
           delete cart.items[id]

           localStorage.setItem('order',JSON.stringify(cart))
           return {product :cart}
        }
        case Types.UPDATE_QTY:{
            let cart = state.product
            let { order,type}=action.payload
            let price = order.price

            if (type == 'plus') {
                cart.items[order._id].qty = cart.items[order._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = price + Number(cart.totalPrice)
            }else{
                cart.items[order._id].qty = cart.items[order._id].qty - 1
                cart.totalQty = cart.totalQty - 1
                cart.totalPrice = cart.totalPrice - price
            }
            localStorage.setItem('order',JSON.stringify(cart))
           return {product :cart}
        }
        case Types.ALL_ORDER_COMPLETE:{
            let cart = state.product;
            cart = {
                items: {},
                totalPrice: 0,
                totalQty: 0
            }
            localStorage.setItem('order',JSON.stringify(cart))
            return {product :cart}
        }
        default:return state
    }
}
