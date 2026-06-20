import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from './slices/themeSlice'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'

function App() {
  const dispatch = useDispatch()
  const { darkMode } = useSelector((state) => state.theme)

  // WHY: Apply dark mode on first load from localStorage
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    dispatch(setDarkMode(isDark))
  }, [dispatch])

  return (
    <Router>
      <div className={darkMode? 'dark' : ''}>
        <Navbar />
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App