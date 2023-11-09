import express from 'express'
import userRouter from './user'

const router = express.Router()

router.get('/health-check', (req, res) => {
    res.send({
        message: 'Hello, world!',
        statuscode: 200
    })
})

router.use('/user', userRouter)

export default router
