import Product from '../models/product.js'

const getProducts = async (req, res) => {
  try {
    console.log('BACKEND HIT - QUERY:', req.query) // PROOF IT WORKS
    
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {}
    
    let sortBy = {}
    if (req.query.sort === 'price_asc') sortBy.price = 1
    if (req.query.sort === 'price_desc') sortBy.price = -1
    if (req.query.sort === 'name_asc') sortBy.name = 1
    
    const products = await Product.find({ ...keyword }).sort(sortBy)
    res.json(products)
  } catch (error) {
    console.error('ERROR:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getProducts, getProductById }