import userService from '~/services/user.service'
import catchAsync from '~/helpers/catch.async'
import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '~/core/success.response'

class UserController {
    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        OK(res, 'create user successfully', await userService.login(req.body))
    })

    register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        CREATED(res, 'create user successfully', await userService.register(req.body))
    })
}

export default new UserController()
