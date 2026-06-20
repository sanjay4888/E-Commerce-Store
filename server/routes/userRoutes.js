import express from 'express'
import { authUser, registerUser } from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

router.post('/', registerUser)        // POST /api/users
router.post('/login', authUser)       // POST /api/users/login

// @desc Get user profile  
router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
})

export default router