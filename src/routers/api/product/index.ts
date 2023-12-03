import express from 'express'
import productController from '~/controllers/api/product.controller'
import { adminRequired } from '~/middlewares/authentication'

const router = express.Router()

router.post('/create', adminRequired, productController.createProduct)
router.get('/list', productController.listProducts)

export default router
