import { combineReducers} from 'redux';
import authReducers from './authReducers';
import {productReducers,oderProduct} from './productReducers';

const rootReducer = combineReducers({
    auth:authReducers,
    product:productReducers,
    order:oderProduct,
})

export default rootReducer;