import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { showProduct,loadSingleProduct,orderProduct } from '../Store/actions/productActions';
import Style from './cssStyle/Home.module.css'

const Home = (props) => {
    const isAuth=useSelector(state =>state.auth.isAuthenticated)
    const isProduct=useSelector(state =>state.product.product)
    

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(showProduct())
    },[])

    return (

        <div className="row">
            {isProduct.length?
            isProduct.map(item=>(
                <div key={item._id} className="col- col-sm-3 col-md-3 col-lg-3 col-xl-3 mt-3">
                <div className={Style.iteamCard}>
                    <img src={item.image} alt=""/>
                    <div className={Style.hoverEf}>
                    {isAuth ?<div className={Style.isAuthDiv}>
                        <button onClick={()=>dispatch(orderProduct(item._id))} className={Style.isAuthLink}>Order</button>
                        <button onClick={()=>dispatch(loadSingleProduct(item._id,props.history))} className={Style.isAuthView}>view</button>
                            
                        </div>
                        :
                        <div className={Style.btnCl}>
                            <Link to='/login'>View</Link>
                            
                        </div>}
                        {isAuth ?<div className={Style.isAutDetails}>
                        <p>Name: {item.name}</p>
                        <p>Price: ${item.price}</p>
                        </div>:''}
                    </div>
                    
                </div>
                
            </div> 
            )): <h1
            style={{display:'grid',placeItems:'center',width:'100%',height:'70vh'}}
            >{isProduct.message}</h1> }
        </div> 
    );
};

export default connect(null,{showProduct,loadSingleProduct,orderProduct})(Home) ;