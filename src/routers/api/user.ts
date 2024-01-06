import express from 'express'
import userController from '~/controllers/api/user.controller'
import { loginRequired } from '~/middlewares/api/authentication'

const router = express.Router()

router.post('/update-profile', loginRequired, userController.updateProfile)
router.post('/change-password', loginRequired, userController.changePassword)
router.get('/forgot-password', userController.forgotPassword)
router.get('/profile', loginRequired, userController.getProfile)

export default router
