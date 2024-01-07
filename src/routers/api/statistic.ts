import express from 'express'
import statisticController from '~/controllers/api/statistic.controller'

const router = express.Router()

router.get('/info', statisticController.getStatistic)

export default router
