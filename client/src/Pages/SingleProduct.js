import React,{ useEffect, useState } from 'react';
import AOS from 'aos';
import {useSelector,useDispatch, connect} from 'react-redux'
import Style from './cssStyle/SignleProduct.module.css'
import {loadSingleProduct } from '../Store/actions/productActions';
import { addToCart } from '../Store/actions/shoppingAction';

const SingleProduct = (props) => {
   
    const state = useSelector(state =>state.product.singleProducts)
    console.log('singleStore',state);
    const dispatch=useDispatch()
    const [valuee,setValue]=useState(0)
    const handePlusClick=()=>{
        setValue(valuee + 1)
    }
    const handeMinaseClick=()=>{
        if (valuee >0) {
            setValue(valuee - 1)
        }else{
            setValue(0)
        }
    }
    
    
    return (
        <div className="row">
            {Object.keys(state).length !==0? <div className="col- col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-3">
                <div className={Style.single}>
                    <div className={Style.singleImage}>
                        <img src={state.image} alt=""/>
                    </div>
                    <div className={Style.singleDis}>
                        <h2>Name:{state.name}</h2>
                        <p>Price: ${state.price}</p>
                        <p>Category: {state.category}</p>
                        <div className={Style.qty}>
                            <button onClick={handeMinaseClick}>-</button>
                            <input placeholder={valuee} type="text"/>
                            <button onClick={handePlusClick}>+</button>
                        </div>
                        <button onClick={()=>dispatch(addToCart(state))} className='mt-3'>Add to cart</button>
                    </div>
                </div>
            </div>: <div className="">
                <h2 style={{display:'grid',placeItems:'center',width:'100%',height:'70vh'}}>
                    No data view
                </h2>
            </div> }
        </div>
    );
};
// const mapStateToProps =(dispatch)=>{
//     return{
//         addToCart:(id)=>dispatch(addToCart(id))
//     }
// }

export default connect(null,{loadSingleProduct,addToCart})(SingleProduct);