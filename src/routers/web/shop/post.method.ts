import express from 'express'
import userController from '~/controllers/web/user.controller'

const router = express.Router()

router.post('/login', userController.login)
router.post('/sign-up', userController.register)

export default router
