import * as Types from './types';
import Axios from 'axios';
import jwtDecode from 'jwt-decode'

export const register =(user,history)=> dispatch => {
    Axios.post('/api/users/register',user)
        .then((res) =>{
            dispatch({
                type:Types.USER_ERROR,
                payload:{
                    error:{}
                }
            })

            history.push('/login')
        })
        .catch((error) =>{
            dispatch({
               type:Types.USER_ERROR,
                payload:{
                    error:error.response.data
                }
            })
        })
}
export const loginUser =(user,history)=> dispatch => {
    Axios.post('/api/users/login',user)
        .then(res=>{
            const AuthToken=res.data.token
            localStorage.setItem('Auth_token',AuthToken)
            const DecodeToken =jwtDecode(AuthToken)
            dispatch({
                type:Types.SET_USER,
                payload:{
                    user:DecodeToken
                }
            })
            history.push('/')
        })
        .catch((error)=>{
            dispatch({
                type:Types.USER_ERROR,
                payload:{
                    error:error.response.data
                }
            })
        })
}
export const userLogout = (history) =>{
    localStorage.removeItem('Auth_token')
    history.push('/login')
    return{
        type:Types.SET_USER,
        payload:{
            user:{}
        }
    }
}