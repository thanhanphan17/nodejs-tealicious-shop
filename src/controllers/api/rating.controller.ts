import { NextFunction } from 'express'
import { OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import ratingService from '~/services/rating.service'

class ProductRatingController {
    createRating = catchAsync(async (req: any, res: any, next: NextFunction) => {
        const payload = req.body
        payload.userId = req.userId

        OK(res, 'create rating successfully', await ratingService.createRating(payload))
    })

    listRatings = catchAsync(async (req: any, res: any, next: NextFunction) => {
        const { productId, page, limit } = req.query
        OK(res, 'list ratings successfully', await ratingService.listRatings(productId, page, limit))
    })
}

export default new ProductRatingController()
