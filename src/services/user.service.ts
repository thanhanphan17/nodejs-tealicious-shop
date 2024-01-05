import bcrypt from 'bcryptjs'
import Prisma from '~/dbs/init.prisma'
import { getInfoData } from '~/utils/response.utils'
import { BusinessLogicError } from '~/core/error.response'

class UserService {
    static async changePassword(userId: string, payload: any) {
        const oldUser = await Prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (oldUser) {
            // compare old password
            const isMatch = await bcrypt.compare(payload.oldPassword, oldUser.password)
            if (!isMatch) {
                throw new BusinessLogicError('old password is incorrect')
            }

            // hash new password
            payload.password = await bcrypt.hash(payload.password, 10)

            const user = await Prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: payload.password
                }
            })

            if (!user) {
                throw new BusinessLogicError("can't change password")
            }

            return {
                user: getInfoData({
                    fields: ['id', 'name', 'avatar', 'email'],
                    object: user
                })
            }
        }
    }

    static async updateProfile(userId: string, payload: any) {
        const user = await Prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: payload.name,
                address: payload.address,
                email: payload.email,
                avatar: payload.avatar
            }
        })

        if (!user) {
            throw new BusinessLogicError("can't update profile")
        }

        return {
            user: getInfoData({
                fields: ['id', 'name', 'avatar', 'email'],
                object: user
            })
        }
    }
}

export default UserService
