import { useState } from 'react'
import './App.css'
import ProductsCard from './components/proucts-card'
import Header from './components/header'
import LoginPage from './pages/loginPage'
import AdminPage from './pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Toaster position="top-right" />
    <Routes>
      <Route path='/admin/*' element={<AdminPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
