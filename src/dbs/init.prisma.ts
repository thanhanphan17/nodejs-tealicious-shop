import { PrismaClient } from '@prisma/client'

class Prisma {
    private static instance: PrismaClient

    /**
     * Connects to the Prisma database.
     *
     * @return {Promise<void>} - A promise that resolves when the connection is established.
     */
    private static async connect() {
        try {
            console.log(`[PRISMA]:::Start connecting to Prisma...`)
            Prisma.instance = new PrismaClient()
            await Prisma.instance.$connect()
            console.log(`[PRISMA]:::Connect to Prisma successfully!`)
        } catch (err) {
            console.error(`[PRISMA]:::${err}`)
        }
    }

    /**
     * Returns the instance of the PrismaClient.
     *
     * @return {PrismaClient} The instance of the PrismaClient.
     */
    public static getInstance(): PrismaClient {
        if (!Prisma.instance) {
            Prisma.connect()
        }
        return Prisma.instance
    }
}

export default Prisma.getInstance()
