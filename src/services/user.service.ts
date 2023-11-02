import Prisma from '~/dbs/init.prisma'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service'
import createTokenPair from '~/auth/utils'

import { API403Error, BusinessLogicError } from '~/core/error.response'
import { getInfoData } from '~/utils/response.utils'

class UserService {
  static async register(payload: { name: string; email: string; password: string }) {
    const oldUser = await Prisma.user.findFirst({ where: { email: payload.email } })
    if (oldUser) {
      throw new API403Error('email already exists')
    }

    const passwordHash = await bcrypt.hash(payload.password, 10)
    payload.password = passwordHash

    const newUser = await Prisma.user.create({ data: payload })
    if (!newUser) {
      throw new BusinessLogicError("can't create user")
    }

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      }
    })

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: newUser.id,
      publicKey
    })

    if (!publicKeyString) {
      throw new BusinessLogicError("can't create public key")
    }

    const tokens = await createTokenPair(
      {
        userId: newUser.id,
        email: payload.email
      },
      privateKey
    )

    return {
      user: getInfoData({
        fields: ['id', 'name', 'email'],
        object: newUser
      }),
      tokens
    }
  }
}

export default UserService
