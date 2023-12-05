import express from 'express'
import { uploadDisk } from '~/configs/config.multer'
import productController from '~/controllers/web/product.controller'
import adminController from '~/controllers/web/admin.controller'

const router = express.Router()

router.post('/login-admin', adminController.login)

router.post('/add-product', uploadDisk.array('files', 4), productController.createProduct)

export default router
