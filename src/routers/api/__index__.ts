import express from 'express'
import authRouter from './auth'
import paymentRouter from './payment'
import productRouter from './product'
import uploadRouter from './upload'
import categoryRouter from './category'
import ratingRouter from './rating'

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
router.use('/upload', uploadRouter)
router.use('/category', categoryRouter)
router.use('/rating', ratingRouter)

export default router
