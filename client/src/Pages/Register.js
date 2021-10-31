import React,{useState} from 'react';
import Style from './cssStyle/Register.module.css';
import {Link} from 'react-router-dom';
import img from '../imge/regiserMan.png';
import {connect, useDispatch, useSelector} from 'react-redux';
import{register} from '../Store/actions/authActions'

const Register = (props) => {
    const [info,setInfo]= useState({})
    const dispatch=useDispatch()
    const errorData =useSelector(state=>state.auth.error)


    const handleChange= (e)=>{
        const newInfo = {...info}
        newInfo[e.target.name] = e.target.value
        setInfo(newInfo)
    }
    let{name,email,password,confirmPassword} = info 
    const handleSubmit =(e)=>{
        dispatch(register({name,email,password,confirmPassword},props.history))
        e.preventDefault()
    }

    return (
        <div className="row mt-5 bg-light">
            <div className="col-md-6">
                <h1 className="text-center display-4">Register Here</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            className={errorData.name ?"form-control is-invalid":"form-control"}
                            placeholder="Enter your name.."
                            onChange={handleChange}
                        />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData && errorData.name 
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            className={errorData.email ?"form-control is-invalid":"form-control"}
                            placeholder="Enter your email.."
                            onChange={handleChange}
                        />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.email && errorData.email 
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            className={errorData.password ?"form-control is-invalid":"form-control"}
                            placeholder="Enter your password.."
                            onChange={handleChange}
                        />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.password  && errorData.password 
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">ConfirmPassword</label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className={errorData.confirmPassword ?"form-control is-invalid":"form-control"}
                            placeholder="Enter your confirmPassword.."
                            onChange={handleChange}
                        />
                        <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.confirmPassword  && errorData.confirmPassword 
                            }
                        </div>
                    </div>
                    <Link to="/login">Already Have a Account..? Login Here</Link>
                    <div className="text-center mb-2">
                        <button className="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
                
            </div>
            <div className="col-md-6 ">      
                <marquee className={Style.marque} behavior="slide" scrollAmount="20">
                    <img style={{width:"250px",height:'250px'}} src={img} alt=""/>       
                </marquee>
            </div>    
        </div>
    );
};

export default connect(null,{register})(Register);