import { client, PutObjectCommand, GetObjectCommand } from '../configs/config.s3'
import crypto from 'crypto'
import fs from 'fs'
import { BusinessLogicError } from '~/core/error.response'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import path from 'path'

class UploadService {
    static async uploadImageS3(fileData?: Express.Multer.File) {
        try {
            const imageName = crypto.randomBytes(16).toString('hex') + path.extname(fileData!.originalname)
            const fileContent = fs.readFileSync(fileData!.path)

            const command = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME || '',
                Key: imageName,
                Body: fileContent,
                ContentType: 'images/jpeg'
            })

            const result = await client.send(command)
            if (!result) {
                throw new BusinessLogicError('upload image failed')
            }

            const signedUrl = await new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME || '',
                Key: imageName
            })
            const url = await getSignedUrl(client, signedUrl, { expiresIn: 3600 })

            return url
        } catch (error) {
            console.log(error)
        }
    }
}

export default UploadService
