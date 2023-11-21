import express from 'express'
import productController from '~/controllers/api/product.controller'
import { adminRequired, authentication } from '~/middlewares/authentication'

const router = express.Router()

router.post('/create', adminRequired, productController.createProduct)

export default router
