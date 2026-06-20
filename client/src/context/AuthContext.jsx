import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)

  // WHY: Persist login on refresh
  useEffect(() => {
    const user = localStorage.getItem('userInfo')
    if (user) setUserInfo(JSON.parse(user))
  }, [])

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password })
    setUserInfo(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  const register = async (name, email, password) => {
  const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password })
  setUserInfo(data)
  localStorage.setItem('userInfo', JSON.stringify(data))
}

  const logout = () => {
    setUserInfo(null)
    localStorage.removeItem('userInfo')
  }

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext