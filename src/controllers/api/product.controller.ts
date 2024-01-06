import { Request, Response, NextFunction } from 'express'
import { filter } from 'lodash'
import { OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import productService from '~/services/product.service'

class ProductController {
    createProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'create product successfully', await productService.createProduct(req.body))
    })

    listProducts = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const filter = {
            name: req.query.name,
            categoryId: req.query.categoryId,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            priceOrder: req.query.priceOrder,
            createdAtOrder: req.query.createdAtOrder,
            status: req.query.status
        }
        const page = req.query.page as number
        const limit = req.query.limit as number
        OK(res, 'list products successfully', await productService.listProducts(filter, page, limit))
    })

    getProductById = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'get product successfully', await productService.getProductById(req.params.id))
    })
}

export default new ProductController()
