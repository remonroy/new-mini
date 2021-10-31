import * as Types from './types';
import Axios from 'axios';

export const showProduct =()=>dispatch=>{
    Axios.get('/api/addProduct/show')
        .then(response =>{
            dispatch({
                type:Types.LOAD_PRODUCT,
                payload:{
                    product:response.data
                }
            })
        })
        .catch(error =>{
            console.log('error',error);
            // dispatch({
            //     type:Types.PRODUCT_ERROR,
            //     payload:{
            //         error:error.response.data
            //     }
            // })
        })
}
export const addProducts = (product) => dispatch =>{
    Axios.post('/api/addproduct/',product)
        .then(res =>{
            console.log('add Product ',res);
            dispatch({
                type:Types.PRODUCT_ERROR,
                payload:{
                    error:{}
                }
            })
            
        })
        .catch(error =>{
            console.log('error',error.response);
            dispatch({
                type:Types.PRODUCT_ERROR,
                payload:{
                    error:error.response.data
                }
            })
        })
}
export const loadSingleProduct =(id,history)=>dispatch=>{
    Axios.get(`/api/addproduct/${id}`)
        .then(product =>{
            console.log('singleDataAction',product);
            dispatch({
                type:Types.SINGLE_PRODUCT,
                payload:{
                    products:product.data
                }
            })
            history.push('/singleProduct')
            
        })
        
        .catch(error=>{
            console.log('error',error.response);
            // dispatch({
            //     type:Types.PRODUCT_ERROR,
            //     payload:{
            //         error:error.response.data
            //     }
            // })
        })
}
export const orderProduct = (id) =>dispatch=>{
    Axios.get(`/api/addproduct/order/${id}`)
        .then(result=>{
            dispatch({
                type:Types.ORDER_PRODUCT,
                payload:{
                    order:result.data.order
                }
            })
        })
        .catch(error=>{
            console.log(error);
        })
}

export const localProductDelete = (id) =>dispatch=>{
    dispatch({
        type:Types.LOCAL_PRODUCT_DELETE,
        payload:{
            id:id
        }
    })
}

export const updateQty =(order,type)=>dispatch=>{
    dispatch({
        type:Types.UPDATE_QTY,
        payload:{
            order,
            type,
            
        }
    })
}

export const checkout = (history) => dispatch =>{
    history.push('/login')
}

export const allOrderInformation = (info) => dispatch =>{
    Axios.post(`/api/allOrder`,info)
        .then(res =>{
            dispatch({
               type:Types.ALL_ORDER_COMPLETE,
                payload:{
                   order:{}
                }
            })
        })
        .catch(err =>{
            console.log('This is save data',err);
        })

}