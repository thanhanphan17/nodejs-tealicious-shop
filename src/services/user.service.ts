import bcrypt from 'bcrypt'
import crypto from 'crypto'
import Prisma from '~/dbs/init.prisma'
import createTokenPair from '~/auth/utils'
import KeyTokenService from './keyToken.service'

import { getInfoData } from '~/utils/response.utils'
import { API403Error, BusinessLogicError } from '~/core/error.response'

class UserService {
  // Register function
  static async register(payload: { name: string; email: string; password: string }) {
    // Check if user already exists
    const oldUser = await Prisma.user.findFirst({ where: { email: payload.email } })
    if (oldUser) {
      throw new API403Error('email already exists')
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(payload.password, 10)
    payload.password = passwordHash

    // Create new user
    const newUser = await Prisma.user.create({ data: payload })
    if (!newUser) {
      throw new BusinessLogicError("can't create user")
    }

    // Generate RSA key pair
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

    // Create a new key token
    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: newUser.id,
      publicKey
    })

    if (!publicKeyString) {
      throw new BusinessLogicError("can't create public key")
    }

    // Create token pair
    const tokens = await createTokenPair(
      {
        userId: newUser.id,
        email: payload.email
      },
      privateKey
    )

    // Return user info and tokens
    return {
      user: getInfoData({
        fields: ['id', 'name', 'email'],
        object: newUser
      }),
      tokens
    }
  }

  // Login function (currently empty)
  static async login(payload: { email: string; password: string }) {
    // Check if user exists
    const user = await Prisma.user.findFirst({ where: { email: payload.email } })
    if (!user) {
      throw new BusinessLogicError('User not found')
    }

    // Check if password is correct
    const match = bcrypt.compare(payload.password, user.password)
    if (!match) throw new BusinessLogicError('Email or password is incorrect')

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

    // Create token pair
    const tokens = await createTokenPair(
      {
        userId: user.id,
        email: payload.email
      },
      privateKey
    )

    await KeyTokenService.createKeyToken({
      userId: user.id.toString(),
      publicKey
    })

    // Return user info and tokens
    return {
      user: getInfoData({
        fields: ['id', 'name', 'email'],
        object: user
      }),
      tokens
    }
  }
}

export default UserService
