import express from 'express'
import shop from '~/routers/web/shop/index'

const router = express.Router()

router.use('/', shop)

export default router
