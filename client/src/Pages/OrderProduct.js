import React,{useState,useEffect} from 'react';
import Style from './cssStyle/OrderProduct.module.css';
import image from '../imageFile/nil.png';
import { Link,useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Types from '../Store/actions/types';
import { localProductDelete,updateQty } from '../Store/actions/productActions';


const OrderProduct = () => {
    const [order,setOrder]=useState({})
    const [id,setId]=useState({})
    
    //product redux store history...
    const orderData = useSelector(state =>state.order.product)
    const dispatch=useDispatch()

    useEffect(()=>{
        
        setOrder(orderData)
    },[orderData])
    
    //qty button history..
    const [valuee,setValue]=useState(0)

    const handleUpdateQty=(order,type)=>{
        dispatch(updateQty(order,type))
        
        setValue(valuee + 1)
    }

    //product delete history...
    const handleDelete=(id)=>{
        setId(id)
        dispatch(localProductDelete(id))
    }
    let style = {
        backgroundColor:'#dc3545',
    }
    let style2 = {
        backgroundColor:'black',
    }
    let cartOrder = []
    
    for (let i in order.items ) {
        let dataInfo= order.items[i].item
        let item = (
            <div className={Style.single}>
                <div className={Style.singleImage}>
                    <img src={dataInfo.image} alt=""/>
                </div>
                <div key={dataInfo._id} className={Style.singleDis}>
                    <h2>Name:{dataInfo.name}</h2>
                    <p>Price: ${dataInfo.price}</p>
                    <p>Category: {dataInfo.category}</p>
                    <div className={Style.qty}>
                        <button style={order.items[i].qty === 1 ? style :style2} disabled={ order.items[i].qty <= 1 } onClick={()=>handleUpdateQty(order.items[i].item,'mainase')}>-</button>
                        <input value={order.items[i].qty} type="text"/>
                        <button onClick={()=>handleUpdateQty(order.items[i].item,'plus')}>+</button>
                    </div>
                    
                </div>
                <div className={Style.delBtn}>
                    <button onClick={()=>handleDelete(dataInfo._id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>
        )
        cartOrder.push(item)
    }
    let history = useHistory();
    const checkOut =()=>{
        history.push(`/orderMan`)
    }
    return (
        <div className="row">
            <div  className="col- col-sm-8 col-md-8 col-lg-8 col-xl-8 mt-3">
               {cartOrder.length >0 ? cartOrder :
                   ( <div className="">
                        <h2 style={{display:'grid',placeItems:'center',width:'100%',height:'70vh'}}>
                            No product order..!
                        </h2>
                    </div>)
               }
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 mt-3 bg-gray ">
                <div className={Style.orderSum}>
                    <h5>Order summery</h5>
                    <h6>TOTAL: <span>({Object.keys(order) !== 0 ? order.totalQty:0} items)</span>  : ${Object.keys(order) !== 0 ? order.totalPrice:0}</h6>
                    <button onClick={checkOut}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

                
export default connect(null,{localProductDelete,updateQty})(OrderProduct);
