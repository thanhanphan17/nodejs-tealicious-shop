import express from 'express'
import shop from '~/routers/web/shop/__index__'
import admin from '~/routers/web/admin/__index__'
import payment from '~/routers/web/payment/__index__'

const router = express.Router()

router.get('/docs', function (req, res, next) {
    res.render('README.hbs')
})

router.get('/health-check', function (req, res, next) {
    res.render('health-check.hbs')
})

router.get('/404', function (req, res, next) {
    const customerName = req.cookies.customerName
    const isLoggedIn = req.cookies.isUser
    res.render('404.hbs', { customerName, isLoggedIn })
})

router.use('/', shop)
router.use('/admin', admin)
router.use('/payment', payment)

export default router
