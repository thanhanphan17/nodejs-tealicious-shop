import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
    }
})

export { PutObjectCommand }
