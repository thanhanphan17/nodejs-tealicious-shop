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

        // count product in each category
        const categories = await Prisma.category.findMany({
            include: {
                Product: true
            }
        })

        const productByCate = []
        for (let i = 0; i < categories.length; i++) {
            productByCate.push({
                label: categories[i].name,
                value: categories[i].Product.length
            })
        }

        return {
            totalProduct,
            totalCategory,
            totalUser,
            totalOrder,
            revenue,
            productByCate
        }
    }
}

export default StatisticService
