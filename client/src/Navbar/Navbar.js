import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import {Link, withRouter } from 'react-router-dom';
import imageFile from '../imageFile/nil.png'
import { userLogout } from '../Store/actions/authActions';
import AddProduct from '../modal/AddProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import {localProductDelete } from '../Store/actions/productActions';

const Navbar = (props) => {
    const isAuth=useSelector(state =>state.auth.isAuthenticated)
    const isUser=useSelector(state =>state.auth.user)
    const orderData = useSelector(state =>state.order.product.totalQty)

    const [order,setOrder]=useState(0)

    const dispatch=useDispatch()
    useEffect(()=>{
        setOrder(orderData)
    },[orderData])
    

    //modal info history...
    const [modalIsOpen, setIsOpen] =useState(false);

    const openModal=()=>{
    setIsOpen(true);
    }
    const closeModal=()=>{
    setIsOpen(false);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className=" ms-auto navbar-nav">
                        <li className="nav-item">
                            {isAuth ?<Link className="nav-link" to ='/'>Home</Link>:<Link className="nav-link" to ='/'>Home</Link>}
                        </li>
                        <li className="nav-item">
                        <Link to='/orderProduct' className="nav-link" href="#">orderProduct</Link>
                        </li>
                        <li className="nav-item">
                        {isAuth ?<Link onClick={openModal} className="nav-link" to="">addProduct</Link>:''}
                        <AddProduct modalIsOpen={modalIsOpen} closeModal={closeModal}></AddProduct>
                        </li>
                        {isAuth ?
                        <li className="nav-item dropdown">
                            <Link to="" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" >       
                                <img 
                                    style={{width:'35px',height:'35px',borderRadius:'50%'}}
                                    src={imageFile} alt="" 
                                />
                            </Link>
                            <ul className="dropp dropdown-menu" >
                                <li><p className="dropdown-item" >Name: {isUser.name}</p></li>
                                <li><p className="dropdown-item" >Email: {isUser.email}</p></li>
                                <li className="dropdown-item">
                                {
                                    isAuth ? <button onClick={()=>dispatch(userLogout(props.history))} className="btn btn-danger">Logout</button>: <Link to='/login'><button className="btn btn-primary">Login</button></Link>
                                }
                                </li>
                            </ul>
                        </li>:<Link to='/login'><button className="btn btn-primary">Login</button></Link>}
                        
                       <li className="nav-item">
                           { isAuth ? <div className="cartLength">
                                <div className="middle">
                                    <Link to =''><FontAwesomeIcon icon={faCartArrowDown} /></Link>
                                <h6>{order}</h6>
                                </div>
                            </div>:''}
                       </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default connect(null,{userLogout,localProductDelete})(withRouter(Navbar));