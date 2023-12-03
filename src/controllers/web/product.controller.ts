import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'
import uploadController from './upload.controller'
import uploadService from '~/services/upload.service'

class ProductController {
    createProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        console.log('here')
        const files = req.files
        console.log(files[0])
        const result = await uploadService.uploadImagesS3(files)
        console.log(result)
        if (result) {
            const { name, quantity, description, price, categoryId } = req.body
            console.log(req.body)
            const accessToken = req.cookies.accessToken
            const refreshToken = req.cookies.refreshToken
            console.log(accessToken)
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
                    url: result
                }
            }

            axios
                .post(url, data, { headers })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('Error:', error)
                })

            res.redirect('/')
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
