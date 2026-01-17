import './App.css'
import Dashboard from './pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Upload from './pages/upload'
import EditProduct from './pages/edit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard /> } />
        <Route path="/upload" element={<Upload /> } />
        <Route path="/product/edit/:id" element={<EditProduct /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App