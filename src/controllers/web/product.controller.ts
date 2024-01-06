import axios from 'axios'
import catchAsync from '~/helpers/catch.async'
import appConfig from '~/configs/config.app'
import { Response, NextFunction } from 'express'
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
                categoryId,
                image: {
                    url: result.data
                }
            }

            axios
                .post(url, data, { headers })
                .then((response) => {
                    res.redirect('/admin/product')
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
    })

    listProduct = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const page = req.query.page || 0
        const limit = req.query.limit || 20
        const name = req.query.name || ''
        const minPrice = req.query.minPrice * 1 || 0
        const maxPrice = req.query.maxPrice * 1 || 1000000
        const priceOrder = req.query.priceOrder || 'asc'
        const createdAtOrder = req.query.createdAtOrder || 'desc'
        const categoryId = req.query.categoryId || ''
        let status = req.query.status
        if (status == 'all') {
            status = ''
        }

        const result = await axios.get(
            `${appConfig.apiURL}/api/product/list?page=${page}&name=${name}&maxPrice=${maxPrice}` +
                `&minPrice=${minPrice}&createAtOrder=${createdAtOrder}&limit=${limit}&priceOrder=${priceOrder}` +
                `&categoryId=${categoryId}&status=${status}`
        )
        return result.data.data
    })

    getProductById = catchAsync(async (req: any, res: Response, next: any) => {
        const result = await axios.get(`${appConfig.apiURL}/api/product/${req.query.id}`)
        return result.data.data
    })
}

export default new ProductController()
