import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../slices/cartSlice'

function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Your cart is empty <Link to="/" className="text-blue-600 hover:underline">Go Back</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <Link to={`/product/${item._id}`} className="text-black dark:text-white hover:text-blue-600">
                    {item.name}
                  </Link>
                </div>
                
                <div className="flex items-center gap-4">
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                    className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                  
                  <span className="font-bold text-black dark:text-white">${item.price}</span>
                  
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <p className="text-2xl font-bold mb-4 text-black dark:text-white">
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </p>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage