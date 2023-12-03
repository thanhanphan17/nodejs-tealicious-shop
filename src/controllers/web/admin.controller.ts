import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class AdminController {
    login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        // Assuming req.body contains the login credentials
        const { email, password } = req.body
        console.log('llllllllllllllllllllllllllllll' + email)
        // Make a POST request to the login API endpoint
        const response = await axios.post(`${appConfig.apiURL}/api/auth/login`, {
            withCredentials: true,
            email,
            password
        })

        if (response.data.status == 200) {
            const result = response.data.data
            if (result.user.role == 'admin') {
                res.cookie('accessToken', result.tokens.accessToken)
                res.cookie('refreshToken', result.tokens.refreshToken)
                res.cookie('adminName', result.user.name)
                res.cookie('adminEmail', result.user.email)
                res.cookie('isLoggedIn', true)
                res.redirect('/admin/dashboard')
            }
            console.log(response.data)
        } else {
            res.render('admin/login-admin.hbs', { data: { loginFail: true } })
        }
        //console.log(response.data)
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
            res.cookie('customerID', result.user.id)
            res.cookie('isUser', false)
            res.cookie('isLogined', true)
            res.redirect('/')
            console.log(req.body)
        } else {
            res.render('shop/signup.hbs', { data: { registerFail: true } })
        }
        console.log(response.data)
    })

    logout = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const accessToken = req.cookies.accessToken
        console.log(accessToken)
        const url = `${appConfig.apiURL}/api/auth/logout`
        const headers = {
            accessToken: accessToken
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
}
export default new AdminController()
