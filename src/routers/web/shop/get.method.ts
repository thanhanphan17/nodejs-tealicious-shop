import express from 'express'
import productController from '~/controllers/web/product.controller'
import userController from '~/controllers/web/user.controller'

const router = express.Router()

router.get('/', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    console.log(isLoggedIn)
    res.render('shop/index.hbs', { customerName, isLoggedIn })
})

router.get('/about-us', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/about-us.hbs', { customerName, isLoggedIn })
})

router.get('/cart', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/cart.hbs', { customerName, isLoggedIn })
})

router.get('/checkout', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/checkout.hbs', { customerName, isLoggedIn })
})

router.get('/contact', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/contact.hbs', { customerName, isLoggedIn })
})

router.get('/forgot-password', function (req, res, next) {
    res.render('shop/forgotpassword.hbs')
})

router.get('/login', function (req, res, next) {
    res.render('shop/login.hbs')
})

router.get('/logout', userController.logout)

router.get('/pages', async (req, res, next) => {
    const productList = await productController.listProduct(req, res, next)
    res.render('shop/pages.hbs', { productList })
})

router.get('/detail-product', async (req, res, next) => {
    const product = await productController.getProductById(req, res, next)
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/detail-product.hbs', { customerName, isLoggedIn, product })
})

router.get('/sign-up', function (req, res, next) {
    res.render('shop/signup.hbs')
})

router.get('/about-us', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/about-us.hbs', { customerName, isLoggedIn })
})

router.get('/thankyou', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/thankyou.hbs', { customerName, isLoggedIn })
})

router.get('/profile', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    const customerEmail = req.cookies.customerEmail
    const customerAddress = req.cookies.customerAddress
    res.render('shop/profile.hbs', { customerName, isLoggedIn, customerEmail })
})

router.get('/change-password', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('shop/change-password.hbs', { customerName, isLoggedIn })
})

export default router
