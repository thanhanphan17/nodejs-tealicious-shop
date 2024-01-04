import { CREATED } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import OrderService from '~/services/order.service'

class OrderController {
    createOrder = catchAsync(async (req: any, res, next) => {
        const payload = req.body
        payload.userId = req.userId
        CREATED(res, 'create order successfully', await OrderService.createOrder(payload))
    })
}

export default new OrderController()