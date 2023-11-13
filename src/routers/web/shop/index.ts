import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('shop/index')
})

router.get('/about-us', function (req, res, next) {
    res.render('shop/about-us')
})

router.get('/cart', function (req, res, next) {
    res.render('shop/cart')
})

router.get('/checkout', function (req, res, next) {
    res.render('shop/checkout')
})

router.get('/contact', function (req, res, next) {
    res.render('shop/contact')
})

router.get('/forgot-password', function (req, res, next) {
    res.render('shop/forgotpassword')
})

router.get('/login', function (req, res, next) {
    res.render('shop/login')
})

router.get('/pages', function (req, res, next) {
    res.render('shop/pages')
})

router.get('/sign-up', function (req, res, next) {
    res.render('shop/signup')
})

router.get('/about-us', function (req, res, next) {
    res.render('shop/about-us')
})

router.get('/thankyou', function (req, res, next) {
    res.render('shop/thankyou')
})

export default router
