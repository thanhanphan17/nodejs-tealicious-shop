import express from 'express'
import uploadController from '~/controllers/api/upload.controller'
import { uploadDisk } from '~/configs/config.multer'
import { adminRequired } from '~/middlewares/api/authentication'

const router = express.Router()

router.post('/single', uploadDisk.single('file'), uploadController.uploadImageS3)
router.post('/multiple', uploadDisk.array('files', 4), uploadController.uploadImagesS3)

export default router
