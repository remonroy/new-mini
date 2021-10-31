import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Navbar from '../Navbar/Navbar';
import SingleProduct from '../Pages/SingleProduct';
import OrderProduct from '../Pages/OrderProduct';
import Notfound from '../Pages/Notfound';
import OrderManInfo from '../Pages/OrderManInfo';



function App() {
  return (
    <BrowserRouter>
     
      <div className="container">
        <Navbar></Navbar>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login'  component={Login}></Route>
          <Route path='/register'  component={Register}></Route>
          <Route path='/singleProduct' component={SingleProduct}></Route>
          <Route path='/orderProduct' component={OrderProduct}></Route>
          <Route path ='/orderMan' component = {OrderManInfo}></Route>
          <Route path='*' component={Notfound}></Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
