const Order = require('../models/Order')

// WHY async: Database save is slow. Must await
// @desc    Create new order
// @route   POST /api/orders
// @access  Public for now, Private later with JWT
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body

    // WHY validation: Prevent empty orders
    // RISK IF MISSING: User clicks Checkout with empty cart = garbage data in DB
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' })
      return
    }

    // WHY create: Mongoose saves to MongoDB
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id, // WHY: Link to Product collection
        _id: undefined // WHY: Remove React key, MongoDB makes new _id
      })),
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder) // 201 = Created
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { addOrderItems }