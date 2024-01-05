import { Console } from 'console'
import express from 'express'
import productController from '~/controllers/web/product.controller'
import userController from '~/controllers/web/user.controller'
import ratingController from '~/controllers/web/rating.controller'
import categoryController from '~/controllers/web/category.controller'

const router = express.Router()

router.get('/', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/index.hbs', { customerName, isLoggedIn })
})

router.get('/about-us', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/about-us.hbs', { customerName, isLoggedIn })
})

router.get('/cart', async (req, res, next) => {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn

    res.render('shop/cart.hbs', { customerName, isLoggedIn })
})

router.get('/checkout', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/checkout.hbs', { customerName, isLoggedIn })
})

router.get('/contact', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
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
    const customerName = req.cookies.customerName
    const productList = await productController.listProduct(req, res, next)
    const categoryList = await categoryController.listCategories(req, res, next)
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/pages.hbs', { productList, isLoggedIn, customerName, categoryList })
})

router.get('/detail-product', async (req, res, next) => {
    const product = await productController.getProductById(req, res, next)
    const rating = await ratingController.listRatings(req, res, next)
    console.log(rating)
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/detail-product.hbs', { customerName, isLoggedIn, product, rating })
})

router.get('/sign-up', function (req, res, next) {
    res.render('shop/signup.hbs')
})

router.get('/about-us', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/about-us.hbs', { customerName, isLoggedIn })
})

router.get('/thankyou', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/thankyou.hbs', { customerName, isLoggedIn })
})

router.get('/profile', function (req, res, next) {
    const avatar = req.cookies.avatar
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    const customerEmail = req.cookies.customerEmail
    const customerID = req.cookies.customerID
    res.render('shop/profile.hbs', { customerName, isLoggedIn, customerID, customerEmail, avatar })
})

router.get('/change-password', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/change-password.hbs', { customerName, isLoggedIn })
})

export default router
