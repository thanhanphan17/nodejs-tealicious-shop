import { NextFunction } from 'express'
import catchAsync from '~/helpers/catch.async'

export const isAdminLoggedInSuccess = catchAsync(async (req: any, res, next: NextFunction) => {
    const isLoggedIn = req.cookies.isAdminLoggedIn
    if (isLoggedIn) {
        return next()
    }
    res.redirect('/admin/login-admin')
})

export const isUserLoggedInSuccess = catchAsync(async (req: any, res, next: NextFunction) => {
    const isLoggedIn = req.cookies.isUserLoggedIn
    if (isLoggedIn) {
        return next()
    }
    res.redirect('/login')
})
