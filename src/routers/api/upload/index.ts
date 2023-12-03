import express from 'express'
import { uploadDisk } from '~/configs/config.multer'
import uploadController from '~/controllers/api/upload.controller'

const router = express.Router()

router.post('/single', uploadDisk.single('file'), uploadController.uploadImageS3)
router.post('/multiple', uploadDisk.array('files', 4), uploadController.uploadImagesS3)

export default router
