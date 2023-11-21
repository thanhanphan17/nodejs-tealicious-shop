import { BusinessLogicError } from '~/core/error.response'
import Prisma from '~/dbs/init.prisma'
import { getInfoData } from '~/utils/response.utils'

class ProductService {
    static async createProduct(payload: any) {
        const product = await Prisma.product.create({
            data: payload
        })

        if (!product) {
            throw new BusinessLogicError("can't create product")
        }

        return {
            product: getInfoData({
                fields: ['id', 'name', 'quantity'],
                object: product
            })
        }
    }
}

export default ProductService
