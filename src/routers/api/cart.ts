import express from 'express'
import { loginRequired } from '~/middlewares/api/authentication'
import cartController from '~/controllers/api/cart.controller'

const router = express.Router()

router.post('/add-to-cart', loginRequired, cartController.addToCart)
router.get('/get-cart', loginRequired, cartController.getCart)
router.patch('/update-quantity', loginRequired, cartController.updateQuantity)
router.post('/remove-product-from-cart', loginRequired, cartController.removeProductFromCart)

export default router
