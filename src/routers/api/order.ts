import express from 'express'
import orderController from '~/controllers/api/order.controller'
import { loginRequired } from '~/middlewares/api/authentication'

const router = express.Router()

router.post('/create-order', loginRequired, orderController.createOrder)

export default router
