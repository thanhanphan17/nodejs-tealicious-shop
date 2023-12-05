import { BusinessLogicError } from '~/core/error.response'
import { getInfoData } from '~/utils/response.utils'
import Prisma from '~/dbs/init.prisma'

class ProductRatingService {
    static async createRating(payload: any) {
        const rating = await Prisma.productRating.create({
            data: payload
        })

        if (!rating) {
            throw new BusinessLogicError("can't create rating")
        }

        return {
            rating: getInfoData({
                fields: ['id', 'rating', 'comment', 'createdAt'],
                object: rating
            })
        }
    }

    static async listRatings(productId: string, page: number, limit: number) {
        const ratings = await Prisma.productRating.findMany({
            skip: page * limit,
            take: limit * 1,
            where: {
                productId: {
                    equals: productId
                }
            },
            include: {
                user: true
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        })

        const totalRating = await Prisma.productRating.count({
            where: {
                productId: {
                    equals: productId
                }
            }
        })

        return {
            ratings,
            totalPage: Math.ceil(totalRating / limit)
        }
    }
}

export default ProductRatingService
