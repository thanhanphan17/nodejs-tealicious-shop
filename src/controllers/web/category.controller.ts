import { Message } from './../../../node_modules/@smithy/eventstream-codec/dist-types/Message.d'
import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'
import uploadController from './upload.controller'

class CategoryController {
    createCategory = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const name = req.body.name
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken
        const url = `${appConfig.apiURL}/api/category/create`
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }
        const data = {
            name: name
        }

        await axios
            .post(url, data, { headers })
            .then((response) => {
                res.redirect('/admin/category')
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error)
            })
    })

    listCategories = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const url = `${appConfig.apiURL}/api/category/list`
        try {
            const response = await axios.get(url)
            // console.log('code', response.data.status)
            if (response.data.status == 200) {
                return response.data.data
            }
        } catch (error) {
            console.log('failedddddddddddddddddddddd')
            res.redirect('/admin/add-category')
        }
    })
}

export default new CategoryController()
