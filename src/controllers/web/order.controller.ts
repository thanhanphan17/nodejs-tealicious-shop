import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class OrderController {
    getOrder = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const url = `http://localhost:8080/api/order/list-my-order`

        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }

        const result = await axios.get(url, { headers })
        return result.data.data
    })

    getAllOrders = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const status = req.query.status || ''
        const url = `http://localhost:8080/api/order/list-all-order?status=${status}`

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
export default new OrderController()
