import express from 'express'
import authRouter from './auth'
import paymentRouter from './payment'
import productRouter from './product'

const router = express.Router()

router.get('/health-check', (req, res) => {
    res.send({
        message: 'Hello, world!',
        statuscode: 200
    })
})

router.use('/auth', authRouter)
router.use('/payment', paymentRouter)
router.use('/product', productRouter)

export default router
