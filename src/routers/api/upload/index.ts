import express from 'express'
import uploadController from '~/controllers/api/upload.controller'
import { uploadDisk } from '~/configs/config.multer'
import { adminRequired } from '~/middlewares/authentication'

const router = express.Router()

router.post('/single', adminRequired, uploadDisk.single('file'), uploadController.uploadImageS3)
router.post('/multiple', adminRequired, uploadDisk.array('files', 4), uploadController.uploadImagesS3)

export default router
