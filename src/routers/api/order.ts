import express from 'express'
import orderController from '~/controllers/api/order.controller'
import { adminRequired, loginRequired } from '~/middlewares/api/authentication'

const router = express.Router()

router.post('/create-order', loginRequired, orderController.createOrder)
router.get('/list-my-order', loginRequired, orderController.listMyOrder)
router.get('/get-order-by-id/:id', loginRequired, orderController.getOrderById)
router.get('/list-all-order', adminRequired, orderController.listAllOrder)
router.patch('/update-order-status', loginRequired, orderController.updateOrderStatus)

export default router
