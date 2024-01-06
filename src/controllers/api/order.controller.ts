import { CREATED } from '~/core/success.response'
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
        CREATED(res, 'get list order successfully', await OrderService.listMyOrder(userId))
    })

    getOrderById = catchAsync(async (req: any, res, next) => {
        const id = req.params.id
        CREATED(res, 'get order successfully', await OrderService.getOrderById(id))
    })
}

export default new OrderController()
