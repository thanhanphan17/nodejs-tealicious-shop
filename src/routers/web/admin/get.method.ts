import express from 'express'
import productController from '~/controllers/web/product.controller'
import categoryController from '~/controllers/web/category.controller'
import { isAdminLoggedInSuccess } from '~/middlewares/loginSuccess'

const router = express.Router()

router.get('/dashboard', isAdminLoggedInSuccess, (req, res, next) => {
    const customerName = req.cookies.adminName
    res.render('admin/index.hbs', { customerName })
})

router.get('/user', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/user.hbs', { customerName })
})

router.get('/category', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    const category = await categoryController.listCategories(req, res, next)
    console.log(category)
    res.render('admin/category.hbs', { category, customerName })
})

router.get('/add-category', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/add-category.hbs', { customerName })
})

router.get('/product', isAdminLoggedInSuccess, async (req, res, next) => {
    const productList = await productController.listProduct(req, res, next)
    const customerName = req.cookies.adminName
    res.render('admin/product.hbs', { productList, customerName })
})

router.get('/order', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/order.hbs', { customerName })
})

router.get('/order', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/order.hbs', { customerName })
})

router.get('/', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    const isLoggedIn = req.cookies.isLoggedIn
    if (isLoggedIn) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login.hbs')
    }
})

router.get('/login-admin', function (req, res, next) {
    const customerName = req.cookies.adminName
    const isLoggedIn = req.cookies.isLoggedIn
    if (isLoggedIn) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login.hbs')
    }
})

router.get('/add-user', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/add-user.hbs', { customerName })
})

router.get('/add-product', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    const category = await categoryController.listCategories(req, res, next)

    res.render('admin/add-product.hbs', { category, customerName })
})

router.get('/add-order', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/add-order.hbs', { customerName })
})

router.get('/profile-admin', isAdminLoggedInSuccess, function (req, res, next) {
    const avatar = req.cookies.avatar
    const customerName = req.cookies.adminName
    const customerEmail = req.cookies.adminEmail
    const customerAddress = req.cookies.customerAddress
    res.render('admin/profile.hbs', { avatar, customerName, customerAddress, customerEmail })
})

export default router
