import { NextFunction } from 'express'
import catchAsync from '~/helpers/catch.async'
import axios from 'axios'
import appConfig from '~/configs/config.app'

export const isAdminLoggedInSuccess = catchAsync(async (req: any, res, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    const url = `${appConfig.apiURL}/api/auth/verify-admin-token`
    const headers = {
        authorization: accessToken,
        'refresh-token': refreshToken
    }
    try {
        const response = await axios.get(url, { headers })
        // console.log('code', response.data.status)
        if (response.data.status == 200) {
            return next()
        }
    } catch (error) {
        res.redirect('/admin/login-admin')
    }
})

export const isUserLoggedInSuccess = catchAsync(async (req: any, res, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    const url = `${appConfig.apiURL}/api/auth/verify-user-token`
    const headers = {
        authorization: accessToken,
        'refresh-token': refreshToken
    }
    try {
        const response = await axios.get(url, { headers })
        console.log('code', response.data.status)
        if (response.data.status == 200) {
            console.log('oooooooooooooooooooooooo')
            return next()
        }
    } catch (error) {
        console.log('faillllllllllllllllllllllllllllll')

        res.redirect('/login')
    }
})
