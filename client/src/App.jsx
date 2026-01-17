import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Header from './Components/Header/index.jsx'
import Footer from './Components/Footer/index.jsx'
import Home from './Pages/Home/index.jsx'
import VerifyEmail from './Pages/VerifyEmail/index.jsx'
import Profile from './Pages/Profile/index.jsx'
import Cart from './Pages/Cart/index.jsx'
import ProductDetail from './Pages/ProductDetail/index.jsx'
import Checkout from './Pages/Checkout/index.jsx'
import Dashboard from './Pages/Dashboard/index.jsx'
import Contact from './Pages/Contact/index.jsx'
import About from './Pages/About/index.jsx'
import Products from './Pages/Products/index.jsx'
import { CartProvider } from './context/CartContext.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" exact={true} element={<Home/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
