import express from 'express'
import { authentication } from '~/middlewares/authentication'
import userController from '~/controllers/user.controller'

const router = express.Router()

router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/logout', authentication, userController.logout)

export default router
