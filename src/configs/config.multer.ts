import multer from 'multer'

export const uploadMemory = multer({
    storage: multer.memoryStorage()
})

export const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/upload/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })
})
