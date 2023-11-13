import express from 'express'
import shop from '~/routers/web/shop/index'
import admin from '~/routers/web/admin/index'

const router = express.Router()

router.use('/', shop)
router.use('/admin', admin)

export default router
