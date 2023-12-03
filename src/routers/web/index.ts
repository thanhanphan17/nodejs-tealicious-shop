import express from 'express'
import shop from '~/routers/web/shop/index'
import admin from '~/routers/web/admin/index'
import payment from '~/routers/web/payment/index'

const router = express.Router()

router.get('/docs', function (req, res, next) {
    res.render('README.hbs')
})

router.get('/health-check', function (req, res, next) {
    res.render('health-check.hbs')
})

router.use('/', shop)
router.use('/admin', admin)
router.use('/payment', payment)

export default router
