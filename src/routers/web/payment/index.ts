import express from 'express'
import moment from 'moment'

const router = express.Router()

router.get('/', function (req, res, next) {
    // Amount and OrderId will be got from req
    const amount = 1234562
    const orderId = moment(new Date()).format('DDHHmmss')
    res.redirect(`/payment/pay?amount=${amount}&order_Id=${orderId}`)
})

router.get('/pay', function (req, res, next) {
    res.render('payment/order.jade', {
        title: 'Thanh Toán Đơn Hàng',
        amount: req.query.amount,
        orderId: req.query.order_Id
    })
})

export default router
