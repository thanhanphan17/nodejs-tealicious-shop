import express from 'express'
import { loginRequired } from '~/middlewares/authentication'
import authController from '~/controllers/api/auth.controller'

const router = express.Router()

router.post('/login', authController.authenticatev2)
router.post('/register', authController.register)

router.get('/logout', loginRequired, authController.logout)
router.get('/refresh-token', loginRequired, authController.refreshToken)

export default router
