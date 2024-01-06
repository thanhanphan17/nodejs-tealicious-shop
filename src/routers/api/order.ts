import express from 'express'
import orderController from '~/controllers/api/order.controller'
import { loginRequired } from '~/middlewares/api/authentication'

const router = express.Router()

router.post('/create-order', loginRequired, orderController.createOrder)
router.get('/list-my-order', loginRequired, orderController.listMyOrder)
router.get('/get-order-by-id/:id', loginRequired, orderController.getOrderById)

export default router
