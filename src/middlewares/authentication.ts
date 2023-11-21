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

const parseJWT = (token: any) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

const getTokens = (req: any) => {
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN]
    return { accessToken, refreshToken }
}

const getUserIdFromToken = (accessToken: string, refreshToken: string) => {
    const obj = parseJWT(accessToken || refreshToken)
    if (!obj.userId) throw new API403Error('Invalid request')
    return obj.userId
}

const getKeyStore = async (userId: string) => {
    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) throw new API404Error('Resource not found')
    return keyStore
}

const verifyToken = (token: string, keyStore: any, userId: string, req: any) => {
    JWT.verify(token, keyStore.publicKey || '', (err: any, decode: any) => {
        if (err) {
            throw new API403Error('Invalid token provided')
        }

        if (userId !== decode.userId) throw new BusinessLogicError('Invalid request')
        req.keyStore = keyStore
        req.user = decode
    })
}

export const authentication = catchAsync(async (req: any, res, next: NextFunction) => {
    const { accessToken, refreshToken } = getTokens(req)

    const userId = getUserIdFromToken(accessToken, refreshToken)

    const keyStore = await getKeyStore(userId)

    if (refreshToken) {
        verifyToken(refreshToken, keyStore, userId, req)
        req.refreshToken = refreshToken
        return next()
    }

    if (!accessToken) throw new API401Error('Invalid request')
    verifyToken(accessToken, keyStore, userId, req)

    return next()
})

export const adminRequired = catchAsync(async (req: any, res, next: NextFunction) => {
    const { accessToken, refreshToken } = getTokens(req)

    const userId = getUserIdFromToken(accessToken, refreshToken)

    const keyStore = await getKeyStore(userId)

    if (refreshToken) {
        verifyToken(refreshToken, keyStore, userId, req)
        req.refreshToken = refreshToken
        return next()
    }

    if (!accessToken) throw new API401Error('Invalid request')
    verifyToken(accessToken, keyStore, userId, req)

    console.log(req.user)

    return next()
})
