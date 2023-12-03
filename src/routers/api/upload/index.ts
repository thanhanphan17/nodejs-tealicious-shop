import express from 'express'
import { uploadDisk } from '~/configs/config.multer'
import uploadController from '~/controllers/api/upload.controller'

const router = express.Router()

router.post('/product', uploadDisk.single('file'), uploadController.uploadImageS3)

export default router
