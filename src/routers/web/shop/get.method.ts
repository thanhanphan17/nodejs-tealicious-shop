import { Console } from 'console'
import express from 'express'
import productController from '~/controllers/web/product.controller'
import userController from '~/controllers/web/user.controller'
import ratingController from '~/controllers/web/rating.controller'
import categoryController from '~/controllers/web/category.controller'
import orderController from '~/controllers/web/order.controller'
import { isUserLoggedInSuccess } from '~/middlewares/loginSuccess'

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

router.get('/checkout', isUserLoggedInSuccess, function (req, res, next) {
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
    const oauthLink = process.env.GOOGLE_AUTHORIZED_REDIRECT_URI
    const clientID = process.env.GOOGLE_CLIENT_ID
    res.render('shop/login.hbs', { oauthLink, clientID })
})

router.get('/logout', userController.logout)

router.get('/pages', async (req, res, next) => {
    req.query.status = 'instock'
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
    const oauthLink = process.env.GOOGLE_AUTHORIZED_REDIRECT_URI
    const clientID = process.env.GOOGLE_CLIENT_ID
    res.render('shop/signup.hbs', { oauthLink, clientID })
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
    const customerAddress = req.cookies.customerAddress
    res.render('shop/profile.hbs', { customerName, isLoggedIn, customerID, customerEmail, avatar, customerAddress })
})

router.get('/change-password', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    res.render('shop/change-password.hbs', { customerName, isLoggedIn })
})

router.get('/login/google', async function (req, res, next) {
    const accessToken = req.query.access_token
    const refreshToken = req.query.refresh_token
    req.body.accessToken = accessToken
    req.body.refreshToken = refreshToken
    await userController.getProfile(req, res, next)
})

router.get('/order-detail', async (req, res, next) => {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUserLoggedIn
    const listOrder = await orderController.getOrder(req, res, next)
    for (let i = 0; i < listOrder.length; i++) {
        if (listOrder[i].status === 'pending') {
            listOrder[i].status = 'Đang chuẩn bị hàng'
        }

        if (listOrder[i].status === 'processing') {
            listOrder[i].status = 'Đang đóng gói đơn hàng'
        }

        if (listOrder[i].status === 'delivering') {
            listOrder[i].status = 'Đang giao hàng'
        }

        if (listOrder[i].status === 'completed') {
            listOrder[i].status = 'Giao hàng thành công'
        }

        if (listOrder[i].status === 'cancelled') {
            listOrder[i].status = 'Đã bị hủy'
        }
    }

    res.render('shop/orderDetails.hbs', { customerName, isLoggedIn, listOrder })
})

export default router
