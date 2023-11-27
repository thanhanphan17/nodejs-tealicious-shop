import authService from '~/services/auth.service'
import catchAsync from '~/helpers/catch.async'
import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '~/core/success.response'
import passport from 'passport'

class AuthController {
    authenticatev1 = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'login user successfully', await authService.login(req.body))
    })

    authenticatev2 = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err: any, user: any) => {
            if (err || !user) {
                return res.status(401).json({
                    status: 400,
                    message: 'Invalid email or password',
                    errors: []
                })
            }
            const result = user.user
            res.cookie('accessToken', result.tokens.accessToken)
            res.cookie('refreshToken', result.tokens.refreshToken)
            OK(res, 'login successfully', result)
        })(req, res)
    })

    refreshToken = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(
            res,
            'get token successfully',
            await authService.refreshToken({
                refreshToken: req.refreshToken,
                user: req.user,
                keyStore: req.keyStore
            })
        )
    })

    logout = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        OK(res, 'logout successfully', await authService.logout(res, req))
    })

    register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        CREATED(res, 'create user successfully', await authService.register(req.body))
    })
}

export default new AuthController()
