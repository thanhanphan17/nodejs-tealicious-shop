import { Request, Response, NextFunction } from 'express'
import { CREATED } from '~/core/success.response'

import catchAsync from '~/helpers/catch.async'
import uploadService from '~/services/upload.service'

class UploadController {
    uploadImageS3 = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const file = req.file
        if (!file) {
            res.status(400).json({
                status: 400,
                message: 'File not found',
                errors: []
            })
            return
        }
        CREATED(res, 'upload image successfully', await uploadService.uploadImageS3(file))
    })
}

export default new UploadController()
