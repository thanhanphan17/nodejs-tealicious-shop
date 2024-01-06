import bcrypt from 'bcryptjs'
import Prisma from '~/dbs/init.prisma'
import { getInfoData } from '~/utils/response.utils'
import { BusinessLogicError } from '~/core/error.response'
import { SendMailOptions } from 'nodemailer'
import { sendMail } from '~/services/mail.service'

class UserService {
    static async getProfile(userId: string) {
        const user = await Prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new BusinessLogicError('user not found')
        }

        return {
            user: getInfoData({
                fields: ['id', 'name', 'avatar', 'email'],
                object: user
            })
        }
    }

    static async changeStatus(userId: string, payload: any) {
        const user = await Prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status: payload.status
            }
        })

        if (!user) {
            throw new BusinessLogicError("can't change status")
        }

        return {
            user: getInfoData({
                fields: ['id', 'name', 'avatar', 'email'],
                object: user
            })
        }
    }

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

    static async forgotPassword(email: string) {
        const randPass = Math.random().toString(8).slice(-8)
        const hashPass = await bcrypt.hash(randPass, 10)

        const user = await Prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new BusinessLogicError('user not found')
        }

        await Prisma.user.update({
            where: {
                email
            },
            data: {
                password: hashPass
            }
        })

        const mailOptions: SendMailOptions = {
            from: 'shoptea.tealicious@gmail.com',
            to: email,
            subject: 'Mật khẩu Yên Trà Quán',
            html: '<p>Mật khẩu mới của bạn là: ' + randPass + '</p>'
        }

        // Call the sendMail function
        await sendMail(mailOptions)
            .then(() => console.log('Email sent successfully'))
            .catch((error) => console.error('Error sending email:', error))

        return true
    }

    static async getListAccount() {
        const users = await Prisma.user.findMany()
        return {
            users
        }
    }
}

export default UserService
