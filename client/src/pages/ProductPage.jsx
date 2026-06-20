import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../slices/cartSlice'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(data)
      } catch (err) {
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  if (loading) return <div className="text-center p-8 text-black dark:text-white">Loading...</div>
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>
  if (!product) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">← Go Back</Link>
      
      <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <img src={product.image} alt={product.name} className="w-full rounded-lg object-cover" />
        
        <div>
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{product.name}</h1>
          <p className="text-2xl font-bold mb-4 text-black dark:text-white">${product.price}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          
          {product.countInStock > 0 && (
            <div className="mb-4">
              <span className="font-semibold text-black dark:text-white mr-2">Qty:</span>
              <select 
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))}
                className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <span className="font-semibold text-black dark:text-white">Status: </span>
            <span className={product.countInStock > 0? "text-green-600" : "text-red-600"}>
              {product.countInStock > 0? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage