import express from 'express'
import { loginRequired } from '~/middlewares/api/authentication'
import ratingController from '~/controllers/api/rating.controller'

const router = express.Router()

router.get('/list', ratingController.listRatings)
router.post('/create', loginRequired, ratingController.createRating)

export default router
