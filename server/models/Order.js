const mongoose = require('mongoose')

// WHY separate schema: Order needs items, total, user info, timestamp
// RISK IF NO SCHEMA: You'd dump random JSON in DB, can't query orders later
const orderSchema = new mongoose.Schema({
  // WHY embedded array: Order "owns" its items. If product deleted later, order still has snapshot
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Product' 
      }
    }
  ],
  totalPrice: { type: Number, required: true },
  // WHY timestamps: Auto-adds createdAt. Companies need order date for reports
  // RISK IF MISSING: Can't sort "latest orders" or do analytics
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
module.exports = Order