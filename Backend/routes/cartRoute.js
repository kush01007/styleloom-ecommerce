import express from 'express'
import authUser from '../middleware/auth.js'
import { addToCart, getUserCart, syncCart, updateCart } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)
cartRouter.post('/sync', authUser, syncCart)

export default cartRouter;
