import express from 'express'
import productController from '~/controllers/api/product.controller'
import { adminRequired } from '~/middlewares/api/authentication'

const router = express.Router()

router.post('/create', adminRequired, productController.createProduct)
router.get('/list', productController.listProducts)
router.get('/:id', productController.getProductById)
router.patch('/update', adminRequired, productController.updateProduct)

export default router
