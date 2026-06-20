const express = require('express')
const router = express.Router()
const { addOrderItems } = require('../controllers/orderController')

// WHY POST: Creating new data. GET would be for fetching orders
router.post('/', addOrderItems)

module.exports = router