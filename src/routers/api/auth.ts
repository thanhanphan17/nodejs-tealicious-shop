import express from 'express'
import { adminRequired, loginRequired } from '~/middlewares/api/authentication'
import authController from '~/controllers/api/auth.controller'

const router = express.Router()

router.post('/login', authController.authenticatev2)
router.post('/register', authController.register)

router.get('/logout', loginRequired, authController.logout)
router.get('/refresh-token', loginRequired, authController.refreshToken)
router.get('/verify-admin-token', adminRequired, authController.verifyToken)
router.get('/verify-user-token', loginRequired, authController.verifyToken)

export default router
