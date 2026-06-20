import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'
import { toggleDarkMode } from '../slices/themeSlice'

function Navbar() {
  const dispatch = useDispatch()
  
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.theme)
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const logoutHandler = () => {
    dispatch(logout())
  }

  const toggleThemeHandler = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black dark:text-white">
          Imaginary Store
        </Link>
        
        <div className="flex items-center space-x-4">
          {/* DARK MODE TOGGLE */}
          <button
            onClick={toggleThemeHandler}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode? '☀️' : '🌙'}
          </button>

          <Link to="/cart" className="text-black dark:text-white hover:text-blue-600">
            Cart ({cartCount})
          </Link>
          
          {userInfo? (
            <>
              <span className="text-black dark:text-white">{userInfo.name}</span>
              <button onClick={logoutHandler} className="bg-red-600 text-white px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar