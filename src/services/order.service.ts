import { BusinessLogicError } from '~/core/error.response'
import Prisma from '~/dbs/init.prisma'

class OrderService {
    static async createOrder(payload: any) {
        console.log('payload', payload)
        const order = await Prisma.order.create({
            data: {
                userId: payload.userId,
                status: 'pending',
                shippingAddress: payload.shippingAddress,
                OrderDetail: {
                    create: {
                        productOrigin: payload.productOrigin
                    }
                }
            }
        })

        if (!order) {
            console.log('error')
            throw new BusinessLogicError("can't create order")
        }

        return order
    }
}

export default OrderService
