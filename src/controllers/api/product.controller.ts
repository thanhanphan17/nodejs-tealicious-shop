import { Request, Response, NextFunction } from 'express'
import { OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import productService from '~/services/product.service'

class ProductController {
    createProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'create product successfully', await productService.createProduct(req.body))
    })
}

export default new ProductController()
