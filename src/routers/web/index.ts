import express from 'express'
import healthCheckRouter from '~/routers/web/health-check'

const router = express.Router()

router.use('/', healthCheckRouter)

export default router
