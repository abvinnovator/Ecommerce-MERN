import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './pages/Cart';
import Admin from './Admin/Admin';
import Myprofile from './Admin/Myprofile';
import AddProduct from './Admin/AddProduct';
import MyProducts from './Admin/MyProducts';
import Earnings from './Admin/Earnings';
import CategoryProducts from './pages/CategoryProducts';
import Home from './components/Home';
import ProductDetails from './pages/ProductDetails';


const App = () => {
  return (
    <div>
      <Router>
     <Routes>
     
      <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />   
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/admin' element={<Admin />} /> 
        <Route path='/my-profile' element={<Myprofile />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='my-products' element={<MyProducts />} />
        <Route path='/earnings' element={<Earnings />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
     </Router>
      
    </div>
  );
};

export default App;
