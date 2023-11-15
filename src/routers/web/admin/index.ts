import express from 'express'

const router = express.Router()

router.get('/dashboard', function (req, res, next) {
    res.render('admin/index.hbs')
})

router.get('/user', function (req, res, next) {
    res.render('admin/user.hbs')
})

router.get('/product', function (req, res, next) {
    res.render('admin/product.hbs')
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

router.get('/add-user', function (req, res, next) {
    res.render('admin/add-user.hbs')
})

router.get('/add-product', function (req, res, next) {
    res.render('admin/add-product.hbs')
})

router.get('/add-order', function (req, res, next) {
    res.render('admin/add-order.hbs')
})

export default router
