import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import axios from 'axios'
import appConfig from '~/configs/config.app'

class UserController {
    login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        // Assuming req.body contains the login credentials
        const { email, password } = req.body
        // Make a POST request to the login API endpoint
        const response = await axios.post(`${appConfig.apiURL}/api/user/login`, {
            email,
            password
        })
        if (response.data.status == 200) {
            const result = response.data.data
            res.cookie('accessToken', result.tokens.accessToken)
            res.cookie('refreshToken', result.tokens.refreshToken)
            res.cookie('customerName', result.user.name)
            res.cookie('isUser', true)
            res.redirect('/')
        } else {
            res.render('shop/login.hbs', { data: { loginFail: true } })
        }
        //console.log(response.data)
    })

    register = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        // Assuming req.body contains the login credentials
        console.log('register')

        const { email, name, password } = req.body
        // Make a POST request to the login API endpoint
        const response = await axios.post(`${appConfig.apiURL}/api/user/register`, {
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
            res.cookie('isUser', true)
            res.redirect('/')
            console.log(req.body)
        } else {
            res.render('shop/signup.hbs', { data: { registerFail: true } })
        }
        console.log(response.data)
    })
}
export default new UserController()
