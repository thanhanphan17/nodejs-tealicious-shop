import express from 'express'
import getMethod from './get.method'
import postMethod from './post.method'
import putMethod from './put.method'
import deleteMethod from './delete.method'
import patchMethod from './patch.method'

const router = express.Router()

router.use(getMethod)
router.use(postMethod)
router.use(putMethod)
router.use(deleteMethod)
router.use(patchMethod)

export default router
