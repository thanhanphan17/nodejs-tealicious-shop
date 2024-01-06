import { client, PutObjectCommand, GetObjectCommand } from '../configs/config.s3'
import { BusinessLogicError } from '~/core/error.response'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import Prisma from '~/dbs/init.prisma'
import imageSize from 'image-size'

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

            const url = process.env.S3_CLOUDFRONT_DOMAIN + '/' + imageName

            return url
        } catch (error) {
            console.log(error)
        }
    }

    static async uploadImagesS3(fileDatas?: any) {
        try {
            const urls = []
            for (const fileData of fileDatas) {
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

                const url = process.env.S3_CLOUDFRONT_DOMAIN + '/' + imageName

                // create image on db
                const dimensions = imageSize(Buffer.from(fileContent))

                if (dimensions.width && dimensions.height) {
                    const { width, height } = dimensions

                    await Prisma.image.create({
                        data: {
                            url: url,
                            width: width * 1,
                            height: height * 1
                        }
                    })
                }

                urls.push(url)
            }
            return urls
        } catch (error) {
            console.log(error)
        }
    }
}

export default UploadService
