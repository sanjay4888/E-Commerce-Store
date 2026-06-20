import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)
  
  // WHY: Calculate subtotal for cart
  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)

  const addToCart = (item) => {
    const existItem = cartItems.find((x) => x._id === item._id)
    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === existItem._id? { ...existItem, qty: existItem.qty + 1 } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }])
    }
  }

  // WHY: Remove item completely from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id))
  }

  return (
    <CartContext.Provider value={{ cartItems, cartCount, subtotal, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext