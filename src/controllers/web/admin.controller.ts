import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class AdminController {
    login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const { email, password } = req.body
        const response = await axios.post(`${appConfig.apiURL}/api/auth/login`, {
            withCredentials: true,
            email,
            password
        })

        if (response.data.status == 200) {
            const result = response.data.data
            if (result.user.role == 'admin') {
                res.cookie('customerID', result.user.id)
                res.cookie('accessToken', result.tokens.accessToken)
                res.cookie('refreshToken', result.tokens.refreshToken)
                res.cookie('adminName', result.user.name)
                res.cookie('adminEmail', result.user.email)
                res.cookie('isAdminLoggedIn', true)
                res.redirect('/admin/dashboard')
            }
            console.log(response.data)
        } else {
            res.render('admin/login-admin.hbs', { data: { loginFail: true } })
        }
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
}
export default new AdminController()
