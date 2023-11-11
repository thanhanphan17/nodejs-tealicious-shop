import { NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import { API401Error, API403Error, API404Error, BusinessLogicError } from '~/core/error.response'
import catchAsync from '~/helpers/catch.async'
import KeyTokenService from '~/services/keyToken.service'

const HEADER = {
    AUTHORIZATION: 'authorization',
    REFRESH_TOKEN: 'refresh-token',
    CLIENT_ID: 'x-client-id'
}

export const authentication = catchAsync(async (req: any, res, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new API401Error('Invalid request')

    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) throw new API404Error('Resource not found')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new API401Error('Invalid request')

    JWT.verify(accessToken, keyStore.publicKey || '', (err: any, decode: any) => {
        if (err) {
            throw err
        }

        if (userId !== decode.userId) throw new BusinessLogicError('Invalid request')
        req.keyStore = keyStore
    })
    next()
})
