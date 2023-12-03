import { client, PutObjectCommand } from '../configs/config.s3'
import crypto from 'crypto'
import fs from 'fs'
import { BusinessLogicError } from '~/core/error.response'

class UploadService {
    static async uploadImageS3(fileData?: Express.Multer.File) {
        try {
            const randomImageName = crypto.randomBytes(16).toString('hex')
            const fileContent = fs.readFileSync(fileData!.path)

            const command = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME || '',
                Key: randomImageName,
                Body: fileContent,
                ContentType: 'images/jpeg'
            })

            const result = await client.send(command)

            if (!result) {
                throw new BusinessLogicError('upload image failed')
            }

            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default UploadService
