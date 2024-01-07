import express from 'express'
import { uploadDisk } from '~/configs/config.multer'
import productController from '~/controllers/web/product.controller'
import adminController from '~/controllers/web/admin.controller'
import categoryController from '~/controllers/web/category.controller'
import userController from '~/controllers/web/user.controller'

const router = express.Router()

router.post('/login-admin', adminController.login)

router.post('/add-product', uploadDisk.array('files', 4), productController.createProduct)

router.post('/add-category', categoryController.createCategory)

router.post('/upload-avatar', uploadDisk.single('file'), async (req, res, next) => {
    await userController.uploadAvatar(req, res, next)
    res.redirect('/admin/profile-admin')
})

router.post('/update-product', uploadDisk.array('files', 4), productController.updateProduct)

export default router
