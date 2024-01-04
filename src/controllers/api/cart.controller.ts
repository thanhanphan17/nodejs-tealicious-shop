import { NextFunction, Response } from 'express'
import { CREATED, OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import CartService from '~/services/cart.service'

class CartController {
    addToCart = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        CREATED(
            res,
            'add to cart successfully',
            await CartService.addToCart(req.userId, req.body.productId, req.body.quantity)
        )
    })

    getCart = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'get cart successfully', await CartService.getCart(req.userId))
    })

    updateQuantity = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(
            res,
            'update quantity successfully',
            await CartService.updateQuantity(req.userId, req.body.productId, req.body.quantity)
        )
    })

    removeProductFromCart = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(
            res,
            'remove product from cart successfully',
            await CartService.removeProductFromCart(req.userId, req.body.productId)
        )
    })
}

export default new CartController()
