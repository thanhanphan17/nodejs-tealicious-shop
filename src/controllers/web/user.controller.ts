import userService from '~/services/user.service'
import catchAsync from '~/helpers/catch.async'
import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '~/core/success.response'
import axios from 'axios'

class UserController {
    login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        console.log('111')
        // Assuming req.body contains the login credentials
        const { email, password } = req.body
        // Make a POST request to the login API endpoint
        const response = await axios.post('https://yentraquan.shop/api/user/login', {
            email,
            password
        })
        if (response.data.status == 200) {
            res.cookie('accessToken', response.data.data.tokens.accessToken)
            res.cookie('refreshToken', response.data.data.tokens.refreshToken)
            res.cookie('customerName', response.data.data.user.name)
            res.redirect('/')
        } else res.render('shop/login.hbs', { data: { loginFail: true } })
        //console.log(response.data)
    })
}
export default new UserController()
