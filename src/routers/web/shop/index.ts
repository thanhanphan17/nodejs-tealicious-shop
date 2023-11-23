import express from 'express'
import userController from '~/controllers/web/user.controller'

const router = express.Router()

router.get('/', function (req, res, next) {
    const customerName = req.cookies.customerName
    res.render('shop/index.hbs', { customerName })
})

router.get('/about-us', function (req, res, next) {
    res.render('shop/about-us.hbs')
})

router.get('/cart', function (req, res, next) {
    res.render('shop/cart.hbs')
})

router.get('/checkout', function (req, res, next) {
    res.render('shop/checkout.hbs')
})

router.get('/contact', function (req, res, next) {
    res.render('shop/contact.hbs')
})

router.get('/forgot-password', function (req, res, next) {
    res.render('shop/forgotpassword.hbs')
})

router.get('/login', function (req, res, next) {
    res.render('shop/login.hbs')
})

router.post('/login', userController.login)

router.get('/pages', function (req, res, next) {
    res.render('shop/pages.hbs')
})

router.get('/detail-product', function (req, res, next) {
    res.render('shop/detail-product.hbs')
})

router.get('/sign-up', function (req, res, next) {
    res.render('shop/signup.hbs')
})

router.post('/sign-up', userController.register)

router.get('/about-us', function (req, res, next) {
    res.render('shop/about-us.hbs')
})

router.get('/thankyou', function (req, res, next) {
    res.render('shop/thankyou.hbs')
})

export default router
