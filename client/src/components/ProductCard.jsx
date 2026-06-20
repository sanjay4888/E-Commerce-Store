import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xl font-bold mb-3 text-black dark:text-white">${product.price}</p>
        
        <button
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard