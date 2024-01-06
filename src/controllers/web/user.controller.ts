import { Response, NextFunction } from 'express'
import catchAsync from '~/helpers/catch.async'
import axios from 'axios'
import appConfig from '~/configs/config.app'
import cartController from './cart.controller'
import uploadController from './upload.controller'

function getArrayCookie(name: string) {
    const cookieName = name + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArray = decodedCookie.split(';')

    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim()
        if (cookie.indexOf(cookieName) === 0) {
            // Extract and parse the stored value using JSON.parse
            return JSON.parse(cookie.substring(cookieName.length, cookie.length))
        }
    }

    return null
}

class UserController {
    login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        // Assuming req.body contains the login credentials
        const { email, password } = req.body
        // Make a POST request to the login API endpoint
        const response = await axios.post(`${appConfig.apiURL}/api/auth/login`, {
            withCredentials: true,
            email,
            password
        })
        if (response.data.status == 200) {
            const result = response.data.data
            res.cookie('accessToken', result.tokens.accessToken)
            res.cookie('refreshToken', result.tokens.refreshToken)
            res.cookie('customerName', result.user.name)
            res.cookie('customerEmail', result.user.email)
            res.cookie('customerAddress', result.user.address)
            res.cookie('isUserLoggedIn', true)
            res.cookie('customerID', result.user.id)
            res.redirect('/')
        } else {
            res.render('shop/login.hbs', { data: { loginFail: true } })
        }
    })

    register = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        // Assuming req.body contains the login credentials
        console.log('register')

        const { email, name, password } = req.body
        // Make a POST request to the login API endpoint
        const response = await axios.post(`${appConfig.apiURL}/api/auth/register`, {
            email,
            name,
            password
        })
        if (response.data.status == 201) {
            const result = response.data.data
            res.cookie('accessToken', result.tokens.accessToken)
            res.cookie('refreshToken', result.tokens.refreshToken)
            res.cookie('customerName', result.user.name)
            res.cookie('customerEmail', result.user.email)
            res.cookie('customerAddress', result.user.address)
            res.cookie('customerID', result.user.id)
            res.cookie('isUserLoggedIn', true)
            res.redirect('/')
        } else {
            res.render('shop/signup.hbs', { data: { registerFail: true } })
        }
        console.log(response.data)
    })

    logout = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const accessToken = req.cookies.accessToken
        const refreshToken = req.cookies.refreshToken

        const url = `${appConfig.apiURL}/api/auth/logout`
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }

        axios
            .get(url, { headers })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error)
            })

        // Clear all cookies
        Object.keys(req.cookies).forEach((cookie) => {
            res.clearCookie(cookie)
        })

        res.redirect('/')
    })

    uploadAvatar = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const result = await uploadController.uploadImageS3(req, res, next)
        if (result.code == 200) {
            res.cookie('avatar', result.data)
        }
        res.redirect('/profile')
    })

    getProfile = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const accessToken = req.body.accessToken
        const refreshToken = req.body.refreshToken

        const url = `${appConfig.apiURL}/api/user/profile`
        const headers = {
            authorization: accessToken,
            'refresh-token': refreshToken
        }

        await axios
            .get(url, { headers })
            .then((response) => {
                const result = response.data.data
                res.cookie('accessToken', req.body.accessToken)
                res.cookie('refreshToken', req.body.refreshToken)
                res.cookie('customerName', result.user.name)
                res.cookie('customerEmail', result.user.email)
                res.cookie('customerAddress', result.user.address)
                res.cookie('customerID', result.user.id)
                res.cookie('avatar', result.user.avatar)
                res.cookie('isUserLoggedIn', true)

                res.redirect('/')
            })
            .catch((error) => {
                return null
            })
    })
}

export default new UserController()
