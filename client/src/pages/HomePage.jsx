import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

function HomePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const keyword = searchParams.get('keyword') || ''
  const pageNumber = searchParams.get('pageNumber') || 1
  const sort = searchParams.get('sort') || 'name_asc'
  
  const [searchTerm, setSearchTerm] = useState(keyword)
  const [sortOption, setSortOption] = useState(sort)
  const [data, setData] = useState({ products: [], page: 1, pages: 1 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products?keyword=${keyword}&sort=${sort}&pageNumber=${pageNumber}`
        )
        setData(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [keyword, sort, pageNumber])

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(`/?keyword=${searchTerm}&sort=${sortOption}&pageNumber=1`)
  }

  const clearSearch = () => {
    setSearchTerm('')
    navigate('/?sort=name_asc&pageNumber=1')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-8">Latest Products</h1>
      
      <div className="flex justify-center mb-8">
        <form onSubmit={submitHandler} className="flex gap-3 w-full max-w-2xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-md flex-1 min-w-0 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
            Search
          </button>
          {keyword && (
            <button 
              type="button" 
              onClick={clearSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 whitespace-nowrap"
            >
              Clear
            </button>
          )}
          <select 
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value)
              navigate(`/?keyword=${searchTerm}&sort=${e.target.value}&pageNumber=1`)
            }}
            className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 w-40"
          >
            <option value="name_asc">Name: A-Z</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </form>
      </div>

      {loading? (
        <p className="text-center text-black dark:text-white">Loading...</p>
      ) : data.products.length === 0? (
        <p className="text-center text-black dark:text-white">No products found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Pagination 
            pages={data.pages} 
            page={data.page} 
            keyword={keyword} 
            sort={sort} 
          />
        </>
      )}
    </div>
  )
}

export default HomePage