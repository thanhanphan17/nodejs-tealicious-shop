import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class CartController {
    addTocart = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const { productId, quantity } = req.body
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken

        const url = `${appConfig.apiURL}/api/cart/add-to-cart`
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }

        const data = {
            productId: productId,
            quantity: quantity * 1
        }

        await axios
            .post(url, data, { headers })
            .then((response) => {
                res.redirect('/cart')
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    })

    getCart = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const url = `${appConfig.apiURL}/api/cart/get-cart`
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }

        const result = await axios.get(url, { headers })
        return result.data.data
    })
}
export default new CartController()
