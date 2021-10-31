import * as Types from './types'

export const addToCart =(itemId)=>dispatch=>{
    dispatch({
        type:Types.ADD_TO_CART,
        payload:{
            id:itemId
        }
    })
}
export const removeCart =(itemId)=>{
    return{
        type:Types.REMOVE_ADD_TO_CART,
        payload:{
            id:itemId
        }
    }
}
export const adjustQty=(itemId,value)=>{
    return{
        type:Types.ADJUST_QTY,
        payload:{
            id:itemId,
            qty:value
        }
    }
}
export const loadCurrentItem =(item)=>{
    return{
        type:Types.LOAD_CURRENT_ITEM,
        payload:{
            payload:item
        }
    }
}
