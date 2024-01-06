import Prisma from '~/dbs/init.prisma'
import AuthService from './auth.service'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service'
import { createTokenPair } from '~/auth/utils'
import { getInfoData } from '~/utils/response.utils'

class OAuthService {
    static async getUserOAuth(email: string, name: string, avatar: string) {
        const user = await Prisma.user.findFirst({ where: { email } })
        if (!user) {
            const randomPassword = Math.random().toString(8).slice(-8)
            try {
                const newUser = await AuthService.register({ name, email, password: randomPassword })

                await Prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        avatar
                    }
                })

                return newUser
            } catch (error) {
                return null
            }
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
            userId: user.id,
            publicKey,
            refreshToken: null
        })

        if (!publicKeyString) {
            return null
        }

        // Create token pair
        const tokens = await createTokenPair(
            {
                userId: user.id,
                email: email,
                role: user.role
            },
            privateKey
        )

        return {
            user,
            tokens
        }
    }
}

export default OAuthService
