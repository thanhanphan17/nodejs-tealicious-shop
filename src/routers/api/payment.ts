import express from 'express'
import Prisma from '~/dbs/init.prisma'

import moment from 'moment'
import config from '~/configs/config.vnpay'
import crypto from 'crypto'
import querystring from 'qs'

const router = express.Router()

router.post('/create_payment_url', function (req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh'

    const date = new Date()
    const createDate = moment(date).format('YYYYMMDDHHmmss')

    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const tmnCode = config.vnp_TmnCode
    const secretKey = config.vnp_HashSecret
    let vnpUrl = config.vnp_Url
    const returnUrl = config.vnp_ReturnUrl
    const orderId = req.query.order_Id
    const amount = Number(req.query.amount)
    const bankCode = req.body.bankCode

    const currCode = 'VND'
    let vnp_Params: { [key: string]: any } = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    vnp_Params['vnp_Locale'] = 'vn'
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = orderId
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = 'VNPAY'
    }

    vnp_Params = sortObject(vnp_Params)

    const signData = querystring.stringify(vnp_Params, { encode: false })
    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

    res.redirect(vnpUrl)
})

router.get('/vnpay_return', async function (req: any, res, next) {
    let vnp_Params = req.query

    const secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = sortObject(vnp_Params)

    const secretKey = config.vnp_HashSecret

    const signData = querystring.stringify(vnp_Params, { encode: false })
    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

    if (secureHash === signed) {
        if (vnp_Params['vnp_ResponseCode'] === '00') {
            const payment = await Prisma.payment.create({
                data: {
                    paymentMethod: 'vnpay',
                    status: 'success',
                    orderId: vnp_Params['vnp_TxnRef'] + '',
                    amount: Number(vnp_Params['vnp_Amount']) / 100
                }
            })

            await Prisma.order.update({
                where: {
                    id: vnp_Params['vnp_TxnRef'] + ''
                },
                data: {
                    paymentId: payment.id,
                    status: 'processing'
                }
            })
            res.render('payment/success.jade', { code: vnp_Params['vnp_ResponseCode'] })
        } else {
            const payment = await Prisma.payment.create({
                data: {
                    paymentMethod: 'vnpay',
                    status: 'failed',
                    orderId: vnp_Params['vnp_TxnRef'] + '',
                    amount: Number(vnp_Params['vnp_Amount']) / 100
                }
            })

            await Prisma.order.update({
                where: {
                    id: vnp_Params['vnp_TxnRef'] + ''
                },
                data: {
                    paymentId: payment.id,
                    status: 'pending'
                }
            })

            res.render('payment/fail.jade', { code: vnp_Params['vnp_ResponseCode'] })
        }
    } else {
        const payment = await Prisma.payment.create({
            data: {
                paymentMethod: 'vnpay',
                status: 'failed',
                orderId: vnp_Params['vnp_TxnRef'] + '',
                amount: Number(vnp_Params['vnp_Amount']) / 100
            }
        })

        await Prisma.order.update({
            where: {
                id: vnp_Params['vnp_TxnRef'] + ''
            },
            data: {
                paymentId: payment.id,
                status: 'pending'
            }
        })
        res.render('payment/fail.jade', { code: '97' })
    }
})

function sortObject(obj: any) {
    const sorted: { [key: string]: any } = {}
    const str = []
    let key
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
    }
    return sorted
}

export default router
