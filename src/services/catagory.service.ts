import Prisma from '~/dbs/init.prisma'
import { BusinessLogicError } from '~/core/error.response'
import { getInfoData } from '~/utils/response.utils'

class CatagoryService {
    static async getCatagories() {
        const catagories = await Prisma.category.findMany()
        return {
            catagories
        }
    }

    static async createCatagory(payload: any) {
        const catagory = await Prisma.category.create({
            data: payload
        })

        if (!catagory) {
            throw new BusinessLogicError("can't create catagory")
        }

        return {
            catagory: getInfoData({
                fields: ['id', 'name'],
                object: catagory
            })
        }
    }

    static async getCatagoryById(id: string) {
        const catagory = await Prisma.category.findUnique({
            where: {
                id
            }
        })

        if (!catagory) {
            throw new BusinessLogicError("can't get catagory")
        }

        return {
            catagory
        }
    }

    static async updateCatagory(id: string, payload: any) {
        const catagory = await Prisma.category.update({
            where: {
                id
            },
            data: payload
        })

        if (!catagory) {
            throw new BusinessLogicError("can't update catagory")
        }

        return {
            catagory: getInfoData({
                fields: ['id', 'name'],
                object: catagory
            })
        }
    }

    static async deleteCatagory(id: string) {
        const catagory = await Prisma.category.delete({
            where: {
                id
            }
        })

        if (!catagory) {
            throw new BusinessLogicError("can't delete catagory")
        }

        return {
            catagory: getInfoData({
                fields: ['id', 'name'],
                object: catagory
            })
        }
    }
}

export default CatagoryService
