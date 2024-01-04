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

    static async listProducts(filter: any, page: number, limit: number) {
        console.log('List product')
        const products = await Prisma.product.findMany({
            skip: page * limit,
            take: limit * 1,
            where: {
                name: {
                    contains: filter.name || ''
                },
                categoryId: filter.categoryId
                    ? {
                          equals: filter.categoryId
                      }
                    : undefined,
                price: {
                    ...(filter.minPrice !== undefined && { gte: filter.minPrice * 1 }),
                    ...(filter.maxPrice !== undefined && { lte: filter.maxPrice * 1 })
                }
            },
            include: {
                category: true
            },
            orderBy: [
                {
                    price: filter.priceOrder || 'asc'
                },
                {
                    createdAt: filter.createdAtOrder || 'desc'
                }
            ]
        })

        const totalProduct = await Prisma.product.count({
            where: {
                name: {
                    contains: filter.name || ''
                },
                categoryId: {
                    equals: filter.categoryId
                },
                price: {
                    ...(filter.minPrice !== undefined && { gte: filter.minPrice * 1 }),
                    ...(filter.maxPrice !== undefined && { lte: filter.maxPrice * 1 })
                }
            }
        })

        return {
            products,
            totalPage: Math.ceil(totalProduct / limit)
        }
    }

    static async getProductById(id: string) {
        const product = await Prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true
            }
        })

        const relatedProducts = await Prisma.product.findMany({
            take: 4,
            where: {
                categoryId: product?.categoryId,
                id: {
                    not: id
                }
            },
            include: {
                category: true
            }
        })

        return {
            product,
            relatedProducts
        }
    }
}

export default ProductService
