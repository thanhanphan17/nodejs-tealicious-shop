import express from 'express'
import { uploadDisk } from '~/configs/config.multer'
import productController from '~/controllers/web/product.controller'
import adminController from '~/controllers/web/admin.controller'
import uploadController from '~/controllers/web/upload.controller'

const router = express.Router()

router.get('/dashboard', function (req, res, next) {
    res.render('admin/index.hbs')
})

router.get('/user', function (req, res, next) {
    res.render('admin/user.hbs')
})

router.get('/product', async (req, res, next) => {
    const productList = await productController.listProduct(req, res, next)
    console.log(productList)
    res.render('admin/product.hbs', { productList })
})

router.get('/order', function (req, res, next) {
    res.render('admin/order.hbs')
})

router.get('/order', function (req, res, next) {
    res.render('admin/order.hbs')
})

router.get('/login-admin', function (req, res, next) {
    res.render('admin/login.hbs')
})

router.post('/login-admin', adminController.login)

router.get('/add-user', function (req, res, next) {
    res.render('admin/add-user.hbs')
})

router.get('/add-product', function (req, res, next) {
    res.render('admin/add-product.hbs')
})

// router.post('/add-product', uploadDisk.array('files', 4), uploadController.uploadImagesS3)
router.post('/add-product', uploadDisk.array('files', 4), productController.createProduct)

router.get('/add-order', function (req, res, next) {
    res.render('admin/add-order.hbs')
})

export default router
