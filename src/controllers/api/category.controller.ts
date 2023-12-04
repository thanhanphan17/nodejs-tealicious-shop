import { NextFunction, Response } from 'express'
import { CREATED, OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import catagoryService from '~/services/catagory.service'

class CategoryController {
    createCategory = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        CREATED(res, 'create category successfully', await catagoryService.createCatagory(req.body))
    })

    listCategories = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'list categories successfully', await catagoryService.getCatagories())
    })
}

export default new CategoryController()
