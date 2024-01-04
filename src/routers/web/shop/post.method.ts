import express from 'express'
import cartController from '~/controllers/web/cart.controller'
import ratingController from '~/controllers/web/rating.controller'
import userController from '~/controllers/web/user.controller'
import { isUserLoggedInSuccess } from '~/middlewares/loginSuccess'

const router = express.Router()

router.post('/login', userController.login)
router.post('/sign-up', userController.register)
router.post('/rating', isUserLoggedInSuccess, ratingController.createRating)
router.post('/add-to-cart', cartController.addTocart)

export default router
