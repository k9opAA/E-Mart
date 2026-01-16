import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/index.jsx'
import Home from './Pages/Home/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="/products" element={<div className="container py-8"><h1>Products/Services</h1></div>}/>
        <Route path="/about" element={<div className="container py-8"><h1>About Us</h1></div>}/>
        <Route path="/contact" element={<div className="container py-8"><h1>Contact Us</h1></div>}/>
        <Route path="/dashboard" element={<div className="container py-8"><h1>Dashboard</h1></div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
