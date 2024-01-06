import express from 'express'
import { uploadDisk } from '~/configs/config.multer'
import productController from '~/controllers/web/product.controller'
import ratingController from '~/controllers/web/rating.controller'
import uploadController from '~/controllers/web/upload.controller'
import userController from '~/controllers/web/user.controller'
import { isUserLoggedInSuccess } from '~/middlewares/loginSuccess'

const router = express.Router()

router.post('/login', userController.login)
router.post('/sign-up', userController.register)
router.post('/rating', isUserLoggedInSuccess, ratingController.createRating)
router.post('/upload-avatar', uploadDisk.single('file'), async (req, res, next) => {
    await userController.uploadAvatar(req, res, next)
    res.redirect('/profile')
})

export default router
