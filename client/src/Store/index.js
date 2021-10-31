import {createStore,applyMiddleware} from 'redux';
import rootReducers from './reducers/rootReducers'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware =applyMiddleware(thunk)

const store = createStore(rootReducers,composeWithDevTools(middleware))

export default store