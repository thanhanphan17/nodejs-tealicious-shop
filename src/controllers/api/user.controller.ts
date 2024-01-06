import { OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import UserService from '~/services/user.service'

class UserController {
    updateProfile = catchAsync(async (req: any, res, next) => {
        const user = await UserService.updateProfile(req.userId, req.body)
        OK(res, 'update profile sucessfully', user)
    })

    changePassword = catchAsync(async (req: any, res, next) => {
        const user = await UserService.changePassword(req.userId, req.body)
        OK(res, 'change password sucessfully', user)
    })

    forgotPassword = catchAsync(async (req: any, res, next) => {
        const success = await UserService.forgotPassword(req.query.email)
        OK(res, 'your password has been sent to your email', success)
    })
}

export default new UserController()
