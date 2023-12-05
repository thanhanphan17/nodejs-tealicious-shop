import express from 'express'
import productController from '~/controllers/web/product.controller'
import categoryController from '~/controllers/web/category.controller'
import { isAdminLoggedInSuccess } from '~/middlewares/loginSuccess'

const router = express.Router()

router.get('/dashboard', isAdminLoggedInSuccess, (req, res, next) => {
    res.render('admin/index.hbs')
})

router.get('/user', isAdminLoggedInSuccess, function (req, res, next) {
    res.render('admin/user.hbs')
})

router.get('/category', isAdminLoggedInSuccess, async (req, res, next) => {
    const category = await categoryController.listCategories(req, res, next)
    console.log(category)
    res.render('admin/category.hbs', { category })
})

router.get('/add-category', isAdminLoggedInSuccess, function (req, res, next) {
    res.render('admin/add-category.hbs')
})

router.get('/product', isAdminLoggedInSuccess, async (req, res, next) => {
    const productList = await productController.listProduct(req, res, next)
    res.render('admin/product.hbs', { productList })
})

router.get('/order', isAdminLoggedInSuccess, function (req, res, next) {
    res.render('admin/order.hbs')
})

router.get('/order', isAdminLoggedInSuccess, function (req, res, next) {
    res.render('admin/order.hbs')
})

router.get('/', isAdminLoggedInSuccess, function (req, res, next) {
    const isLoggedIn = req.cookies.isLoggedIn
    if (isLoggedIn) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login.hbs')
    }
})

router.get('/login-admin', function (req, res, next) {
    const isLoggedIn = req.cookies.isLoggedIn
    if (isLoggedIn) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login.hbs')
    }
})

router.get('/add-user', isAdminLoggedInSuccess, function (req, res, next) {
    res.render('admin/add-user.hbs')
})

router.get('/add-product', isAdminLoggedInSuccess, async (req, res, next) => {
    const category = await categoryController.listCategories(req, res, next)

    res.render('admin/add-product.hbs', { category })
})

router.get('/add-order', isAdminLoggedInSuccess, function (req, res, next) {
    res.render('admin/add-order.hbs')
})

export default router
