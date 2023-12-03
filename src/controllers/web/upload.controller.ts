import catchAsync from '~/helpers/catch.async'
import { Response, NextFunction } from 'express'
import uploadService from '~/services/upload.service'

class UploadController {
    uploadImagesS3 = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        // Assuming req.body contains the login credentials
        const files = req.files
        console.log(files[0])
        const result = await uploadService.uploadImagesS3(files)
        if (result != null || result === undefined || !result) {
            return {
                message: 'Failed',
                data: null
            }
        }
        return {
            message: 'Success',
            data: result
        }
    })
}
export default new UploadController()
