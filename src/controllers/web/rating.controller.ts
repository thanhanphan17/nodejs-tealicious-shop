import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class ProductRatingController {
    createRating = catchAsync(async (req: any, res: any, next: NextFunction) => {
        console.log('startttttttttttttttttttttttttttttttttttttttttttttt')
        const { productId, rating, comment } = req.body
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken

        const url = `${appConfig.apiURL}/api/rating/create`
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }
        const data = {
            productId: productId,
            rating: rating,
            comment: comment
        }
        console.log(data)

        await axios
            .post(url, data, { headers })
            .then((response) => {
                console.log(response)
                res.redirect(`/detail-product?id=${productId}`)
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error)
            })
    })
    listRatings = catchAsync(async (req: any, res: any, next: NextFunction) => {})
}

export default new ProductRatingController()
