import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";

import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";

import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";



const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
       
        
        <Route path="/products/:category/:id" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />
        
        <Route path="/success" element={<Success />} />
        <Route path="/cart" element={<Cart />} />
        {user ? <Route path="*" element={<Navigate to="/" replace />} /> : <Route path="/login"  element={<Login />} /> }   
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </Router>
  )
};

export default App;