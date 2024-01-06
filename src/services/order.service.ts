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

    static async updateOrderStatus(payload: any) {
        const order = await Prisma.order.update({
            where: {
                id: payload.orderId
            },
            data: {
                status: payload.status
            }
        })

        if (!order) {
            throw new BusinessLogicError("can't update order")
        }

        return order
    }

    static async getOrderById(id: string) {
        const order = await Prisma.order.findFirst({
            where: {
                id
            },
            include: {
                OrderDetail: true
            }
        })

        return order
    }

    static async listMyOrder(userId: string) {
        const orders = await Prisma.order.findMany({
            where: {
                userId
            },
            include: {
                OrderDetail: true
            }
        })

        return orders
    }

    static async listAllOrder() {
        const orders = await Prisma.order.findMany({
            include: {
                OrderDetail: true
            },
            orderBy: [
                {
                    createdAt: 'desc'
                },
                {
                    status: 'desc'
                }
            ]
        })

        return orders
    }
}

export default OrderService
