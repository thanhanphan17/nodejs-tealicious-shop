import express from 'express'

const router = express.Router()

router.get('/dashboard', function (req, res, next) {
    res.render('admin/index')
})

router.get('/user', function (req, res, next) {
    res.render('admin/user')
})

router.get('/product', function (req, res, next) {
    res.render('admin/product')
})

router.get('/order', function (req, res, next) {
    res.render('admin/order')
})

router.get('/order', function (req, res, next) {
    res.render('admin/order')
})

router.get('/login-admin', function (req, res, next) {
    res.render('admin/login')
})

router.get('/add-user', function (req, res, next) {
    res.render('admin/add-user')
})

router.get('/add-product', function (req, res, next) {
    res.render('admin/add-product')
})

router.get('/add-order', function (req, res, next) {
    res.render('admin/add-order')
})

export default router
