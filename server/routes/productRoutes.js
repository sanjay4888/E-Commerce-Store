import express from 'express'
import Product from '../models/Product.js'
const router = express.Router()

// WHY: Pagination + Search + Sort in one endpoint
router.get('/', async (req, res) => {
  const pageSize = 8 // Products per page
  const page = Number(req.query.pageNumber) || 1
  
  const keyword = req.query.keyword 
   ? { name: { $regex: req.query.keyword, $options: 'i' } } 
    : {}
  
  // WHY: Sort options for interview points
  let sortOption = {}
  if (req.query.sort === 'price_asc') sortOption = { price: 1 }
  else if (req.query.sort === 'price_desc') sortOption = { price: -1 }
  else sortOption = { name: 1 }

  const count = await Product.countDocuments({...keyword })
  const products = await Product.find({...keyword })
   .sort(sortOption)
   .limit(pageSize)
   .skip(pageSize * (page - 1))

  res.json({ 
    products, 
    page, 
    pages: Math.ceil(count / pageSize),
    total: count 
  })
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) res.json(product)
  else res.status(404).json({ message: 'Product not found' })
})

export default router