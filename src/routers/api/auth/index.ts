import express from 'express'
import { authentication } from '~/middlewares/authentication'
import authController from '~/controllers/api/auth.controller'

const router = express.Router()

router.post('/login', authController.authenticatev2)
router.post('/register', authController.register)

router.get('/logout', authentication, authController.logout)
router.get('/refresh-token', authentication, authController.refreshToken)

export default router
