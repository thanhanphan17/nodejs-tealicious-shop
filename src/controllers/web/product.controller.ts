import { Message } from './../../../node_modules/@smithy/eventstream-codec/dist-types/Message.d'
import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'
import uploadController from './upload.controller'

class ProductController {
    createProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const result = await uploadController.uploadImagesS3(req, res, next)

        if (result.code == 200) {
            const { name, quantity, description, price, categoryId } = req.body
            const accessToken = req.cookies.accessToken
            const refreshToken = req.cookies.refreshToken

            const url = `${appConfig.apiURL}/api/product/create`
            const headers = {
                authorization: accessToken,
                'refresh-token': refreshToken
            }

            const data = {
                name: name,
                quantity: quantity * 1,
                description: description,
                price: price * 1,
                image: {
                    url: result.data
                }
            }

            axios
                .post(url, data, { headers })
                .then((response) => {
                    console.log(response.data)

                    res.redirect('/')
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('Error:', error)
                })
        }
    })

    listProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const page = req.query.page || 0
        const limit = req.query.limit || 20
        const result = await axios.get(`${appConfig.apiURL}/api/product/list?page=${page}&limit=${limit}`)
        return result.data.data
    })
}

export default new ProductController()