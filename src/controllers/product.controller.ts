import { Request, Response, NextFunction } from 'express'
import catchAsync from '~/helpers/catch.async'

class ProductController {
    createProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        console.log(req.body)
    })
}
