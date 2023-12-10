import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class ProductRatingController {
    createRating = catchAsync(async (req: any, res: any, next: NextFunction) => {
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
            rating: rating * 1,
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
    listRatings = catchAsync(async (req: any, res: any, next: NextFunction) => {
        console.log('rating listtttttttttttttttttttt')
        const page = 0
        const limit = 10

        const url = `${appConfig.apiURL}/api/rating/list?page=${page}&limit=${limit}&productId=${req.query.id}`
        console.log('url comtroller  ' + url)
        try {
            const response = await axios.get(url)
            if (response.data.status == 200) {
                return response.data.data.ratings
            }
        } catch (error) {
            res.redirect('/')
        }
    })
}

export default new ProductRatingController()
