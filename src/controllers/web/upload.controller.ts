import { Code } from './../../../node_modules/bson/src/code'
import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import uploadService from '~/services/upload.service'

class UploadController {
    uploadImagesS3 = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        try {
            const files = req.files
            console.log(files)
            const result = await uploadService.uploadImagesS3(files)

            if (result == null || result === undefined || !result) {
                return {
                    code: 400,
                    data: null
                }
            }
            return {
                code: 200,
                data: result
            }
        } catch (error) {
            return {
                message: 500,
                data: null
            }
        }
    })

    uploadImageS3 = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        try {
            const file = req.file
            const result = await uploadService.uploadImageS3(file)

            if (result == null || result === undefined || !result) {
                return {
                    code: 400,
                    data: null
                }
            }
            return {
                code: 200,
                data: result
            }
        } catch (error) {
            return {
                message: 500,
                data: null
            }
        }
    })
}

export default new UploadController()
