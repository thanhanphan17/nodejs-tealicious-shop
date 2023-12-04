import express from 'express'
import { adminRequired } from '~/middlewares/authentication'
import categoryController from '~/controllers/api/category.controller'

const router = express.Router()

router.post('/create', adminRequired, categoryController.createCategory)
router.get('/list', categoryController.listCategories)

export default router
