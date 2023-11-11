import express from 'express'
import healthCheckRouter from '~/routers/web/health-check'
import home from '~/routers/web/shop/index'
import aboutus from '~/routers/web/shop/aboutus'
import index from '~/routers/web/shop/index'

const router = express.Router()


router.use('/', home) 

router.use('/aboutus', aboutus) 

export default router
