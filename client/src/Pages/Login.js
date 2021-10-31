import React,{useState} from 'react';
import Style from './cssStyle/Login.module.css';
import img from '../imge/regiserMan.png';
import {Link, useParams} from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/actions/authActions';

const Login = (props) => {
    const [log,setLog]= useState({})
    const dispatch=useDispatch()
    const errorData=useSelector(state =>state.auth.error)
    let { info } = useParams();
    console.log('This is useParams',info);
    

    const handleChange= (e)=>{
        const newLog = {...log}
        newLog[e.target.name] = e.target.value
        setLog(newLog)
    }
    let{email,password} = log 
    const handleSubmit =(e)=>{
        dispatch(loginUser({email,password},props.history))
        e.preventDefault()
    }
    

    return (
        <div className="row mt-5 bg-light">
            <div className="col-md-6">
                <h1 className="text-center display-4">Login Here</h1>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            className={errorData.email ? "form-control is-invalid":errorData.message ?"form-control is-invalid":"form-control"}
                            placeholder="Enter your email.."
                            onChange={handleChange}
                        />
                       { errorData.email && <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.email
                            }
                        </div>
                        }
                        {errorData.message && <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.message 
                            }
                        </div>
                        }
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            className={errorData.password ?"form-control is-invalid":errorData.message ?"form-control is-invalid":"form-control"}
                            placeholder="Enter your password.."
                            onChange={handleChange}
                        />
                        {errorData.password && <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.password 
                            }
                        </div>
                        }
                        {errorData.message && <div id="validationServer03Feedback" className="invalid-feedback">
                            {
                                errorData.message 
                            }
                         </div>
                        }
                        
                    </div>
                    <Link to="/register">Don't Have a Account..? Register Here</Link>
                    <div className="text-center mb-2">
                        <button className="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
                
            </div>
            
            <div className="col-md-6 ">      
                <marquee className={Style.logMarque} behavior="slide" scrollAmount="20">
                    <img style={{width:"250px",height:'250px'}} src={img} alt=""/>       
                </marquee>
            </div>    
        </div>
    );
};

export default connect(null,{loginUser})(Login);