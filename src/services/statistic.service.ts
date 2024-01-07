import Prisma from '~/dbs/init.prisma'

class StatisticService {
    static async getStatistic() {
        const totalProduct = await Prisma.product.count()
        const totalCategory = await Prisma.category.count()
        const totalUser = await Prisma.user.count()
        const totalOrder = await Prisma.order.count()
        let revenue = 0
        const orderDetail = await Prisma.orderDetail.findMany()

        for (let i = 0; i < orderDetail.length; i++) {
            revenue += orderDetail[i].total
        }

        return {
            totalProduct,
            totalCategory,
            totalUser,
            totalOrder,
            revenue
        }
    }
}

export default StatisticService
