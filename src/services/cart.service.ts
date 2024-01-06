import { BusinessLogicError } from '~/core/error.response'
import Prisma from '~/dbs/init.prisma'

class CartService {
    static async getCart(userId: string) {
        const cart = await Prisma.cart.findMany({
            where: {
                userId
            },
            include: {
                product: true
            }
        })

        return cart
    }

    static async addToCart(userId: string, productId: string, quantity: number) {
        const oldProductInCart = await Prisma.cart.findMany({
            where: {
                userId,
                productId
            }
        })

        if (oldProductInCart.length) {
            throw new BusinessLogicError('product already in cart')
        }

        const product = await Prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (product && product?.quantity < quantity) {
            throw new BusinessLogicError("we don't have enough quantity")
        }

        const cart = await Prisma.cart.create({
            data: {
                userId,
                productId,
                quantity
            }
        })

        if (!cart) {
            throw new BusinessLogicError("can't add to cart")
        }

        await Prisma.product.update({
            where: {
                id: productId
            },
            data: {
                quantity: {
                    decrement: quantity
                }
            }
        })

        return cart
    }

    static async updateQuantity(userId: string, productId: string, quantity: number) {
        const product = await Prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (product && product?.quantity < quantity) {
            throw new BusinessLogicError("we don't have enough quantity")
        }

        const cart = await Prisma.cart.updateMany({
            where: {
                userId,
                productId
            },
            data: {
                quantity
            }
        })

        if (!cart) {
            throw new BusinessLogicError("can't update quantity")
        }

        return cart
    }

    static async removeProductFromCart(userId: string, productId: string) {
        const cart = await Prisma.cart.deleteMany({
            where: {
                userId,
                productId
            }
        })

        if (!cart) {
            throw new BusinessLogicError("can't delete cart")
        }

        return cart
    }
}

export default CartService
