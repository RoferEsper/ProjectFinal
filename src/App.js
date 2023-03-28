import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import WomanPage from './pages/Products/WomanPage';
import ManPage from './pages/Products/ManPage';
import RegisterPage from "./pages/Register/RegisterPage";
import ErrorPage from "./pages/404/404";
import NavBarComponent from './components/Navbar/Navbar';
import CartPage from "./pages/CartPage/CartPage";
import Footer from "./components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import FavoritesPage from './pages/Favorites/favorites';
import InfoPage from './pages/Info/infoPage' 
import { Navbar } from 'react-bootstrap';
import AdminProducts from './pages/AdminProducts/AdminProductsPage';
import CartProvider from "./components/CartProvider/CartProvider";
import AdminUsers from './pages/AdminUsers/AdminUsersPage';
import AdminShoppingCart from './pages/AdminShopping/AdminShopping';


function App() {


  
  return (
    <CartProvider> 
     <BrowserRouter >
      <NavBarComponent />
      <Routes>
        
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/*' element={<ErrorPage />}></Route>
        <Route path='/womanpage' element={<WomanPage />}></Route>
        <Route path='/manpage' element={<ManPage />}></Route>
        <Route path='/adminProducts' element={<AdminProducts />}></Route>
        <Route path='/infopage' element={<InfoPage />}></Route>
        <Route path='/cartpage' element={<CartPage />}></Route>
        <Route path='/adminUsers' element={<AdminUsers />}></Route>
        <Route path='/adminShopping' element={<AdminShoppingCart />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider>
  );
}
export default App;
