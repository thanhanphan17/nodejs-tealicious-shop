import { CREATED, OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import OrderService from '~/services/order.service'

class OrderController {
    createOrder = catchAsync(async (req: any, res, next) => {
        const payload = req.body
        payload.userId = req.userId
        CREATED(res, 'create order successfully', await OrderService.createOrder(payload))
    })

    listMyOrder = catchAsync(async (req: any, res, next) => {
        const userId = req.userId
        OK(res, 'get list order successfully', await OrderService.listMyOrder(userId))
    })

    listAllOrder = catchAsync(async (req: any, res, next) => {
        OK(res, 'get list order successfully', await OrderService.listAllOrder())
    })

    getOrderById = catchAsync(async (req: any, res, next) => {
        const id = req.params.id
        OK(res, 'get order successfully', await OrderService.getOrderById(id))
    })

    updateOrderStatus = catchAsync(async (req: any, res, next) => {
        const payload = req.body
        OK(res, 'update order successfully', await OrderService.updateOrderStatus(payload))
    })
}

export default new OrderController()
