import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import Prisma from '~/dbs/init.prisma'
import { createTokenPair } from '~/auth/utils'
import KeyTokenService from './keyToken.service'

import { getInfoData } from '~/utils/response.utils'
import { API401Error, API403Error, BusinessLogicError } from '~/core/error.response'
import keyTokenModel from '~/models/keyToken.model'

class AuthService {
    /**
     * Registers a new user.
     *
     * @param payload - The user data including name, email, and password
     * @returns An object containing the user info and tokens
     * @throws API403Error if the email already exists
     * @throws BusinessLogicError if there is an error creating the user or public key
     */
    static async register(payload: { name: string; email: string; password: string }) {
        // Check if email already exists
        const oldUser = await Prisma.user.findFirst({ where: { email: payload.email } })
        if (oldUser) {
            throw new API403Error('email already exists')
        }

        // Hash password
        const passwordHash = await bcrypt.hash(payload.password, 10)
        payload.password = passwordHash

        // Create user
        const newUser = await Prisma.user.create({ data: payload })
        if (!newUser) {
            throw new BusinessLogicError("can't create user")
        }

        // Generate RSA key pair
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })

        // Create a new key token
        const publicKeyString = await KeyTokenService.createKeyToken({
            userId: newUser.id,
            publicKey,
            refreshToken: null
        })

        if (!publicKeyString) {
            throw new BusinessLogicError("can't create public key")
        }

        // Create token pair
        const tokens = await createTokenPair(
            {
                userId: newUser.id,
                email: payload.email,
                role: newUser.role
            },
            privateKey
        )

        // Return user info and tokens
        return {
            user: getInfoData({
                fields: ['id', 'name', 'email', 'avatar', 'role'],
                object: newUser
            }),

            tokens
        }
    }

    /**
     * Log in a user with the provided email and password.
     *
     * @param payload - The login payload containing email and password
     * @returns An object containing user information and tokens
     * @throws BusinessLogicError if the user is not found or if the email or password is incorrect
     */
    static async login(payload: { email: string; password: string }) {
        // Find the user by email
        const user = await Prisma.user.findFirst({ where: { email: payload.email } })

        // Throw an error if the user is not found
        if (!user) {
            throw new BusinessLogicError('User not found')
        }

        // Compare the provided password with the user's password
        if (!(await bcrypt.compare(payload.password, user.password))) {
            throw new BusinessLogicError('Email or password is incorrect')
        }

        // Generate RSA key pair
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })

        // Create token pair
        const tokens = await createTokenPair(
            {
                userId: user.id,
                email: payload.email,
                role: user.role
            },
            privateKey
        )

        // Create key token
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            userId: user.id.toString(),
            publicKey
        })

        // Return user information and tokens
        return {
            user: getInfoData({
                fields: ['id', 'name', 'email', 'avatar', 'role'],
                object: user
            }),
            tokens
        }
    }

    /**
     * Logout the user by deleting the key from the key store.
     *
     * @param {any} keyStore - The key store object.
     * @return {Promise<object>} - A promise that resolves to an object with a success property.
     */
    static async logout(res: any, req: any) {
        await KeyTokenService.deleteKeyById(req.keyStore._id)
        // Clear cookies
        Object.keys(req.cookies).forEach((cookieName) => {
            res.clearCookie(cookieName)
        })
        return { success: true }
    }

    /**
     * Refreshes the user's tokens using a refresh token.
     * @param payload - Object containing user, keyStore, and refreshToken
     * @returns Object containing the user and the new tokens
     */
    static async refreshToken(payload: { user: any; keyStore: any; refreshToken: string }) {
        const { user, keyStore, refreshToken } = payload
        const { userId, email } = user

        // Check if the refresh token has been used before
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyByUserId(userId)
            throw new BusinessLogicError('Invalid refresh token')
        }

        // Check if the refresh token matches the one stored in the key store
        if (refreshToken !== keyStore.refreshToken) {
            throw new API401Error('User not registered')
        }

        // Find the user in the database
        const foundUser = await Prisma.user.findFirst({ where: { id: userId } })
        if (!foundUser) {
            throw new API401Error('User not registered')
        }

        // Generate RSA key pair
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })

        // Create new tokens using the private key
        const tokens = await createTokenPair(
            {
                userId: userId,
                email: email,
                role: foundUser.role
            },
            privateKey
        )

        // Update the key store with the new public key and refresh token
        await keyTokenModel.findOneAndUpdate({
            filter: { _id: keyStore._id },
            $set: {
                publicKey: publicKey,
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })

        return {
            user: user,
            tokens
        }
    }
}

export default AuthService
