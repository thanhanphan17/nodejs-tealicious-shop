import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const user = await prisma.user.createMany({
        data: [
            {
                id: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                name: 'ptan21',
                email: 'ptan21@clc.fitus.edu.vn',
                role: 'admin',
                //12340000@N
                password: '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2'
            },
            {
                id: '9ca710f0-4c11-411c-8aaf-78f545ed35af',
                name: 'phgb21',
                email: 'phgb21@clc.fitus.edu.vn',
                role: 'admin',
                //12340000@N
                password: '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2'
            },
            {
                id: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                name: 'user',
                email: 'user@example.com',
                role: 'user',
                //12340000@N
                password: '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2'
            }
        ]
    })

    const category = await prisma.category.createMany({
        data: [
            {
                id: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                name: 'Phong Vị Yên Trà'
            },
            {
                id: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7b7a',
                name: 'Hoa Cỏ Dưỡng Tâm'
            },
            {
                id: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb',
                name: 'Thảo Mộc Nhiệt Đới'
            },
            {
                id: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb',
                name: 'Yên An Ngự Trà'
            }
        ]
    })

    const product = await prisma.product.createMany({
        data: [
            {
                name: 'Liên Hoa Ngự Trà',
                price: 120000,
                description: 'Liên Hoa Ngự Trà',
                categoryId: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                quantity: 10
            },
            {
                name: 'Gạo Lức Thất Tinh Hoa',
                price: 150000,
                description: 'Gạo Lức Thất Tinh Hoa',
                categoryId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb',
                quantity: 10
            },
            {
                name: 'Hibiscus Cam Quế',
                price: 90000,
                description: 'Hibiscus Cam Quế',
                categoryId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb',
                quantity: 10
            },
            {
                name: 'Trà An Yên Ngủ Ngon',
                price: 200000,
                description: 'Trà An Yên Ngủ Ngon',
                categoryId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7b7a',
                quantity: 10
            }
        ]
    })

    console.log({ user, category, product })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
