import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // delete all data
    await prisma.discount.deleteMany()
    await prisma.productRating.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.orderDetail.deleteMany()
    await prisma.payment.deleteMany()
    await prisma.order.deleteMany()
    await prisma.category.deleteMany()
    await prisma.product.deleteMany()
    await prisma.image.deleteMany()
    await prisma.user.deleteMany()

    // create sample data
    const image = await prisma.image.createMany({
        data: [
            {
                id: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                url: 'https://i.imgur.com/7f6s1n4.png',
                height: 100,
                width: 100
            },
            {
                id: '9ca710f0-4c11-411c-8aaf-78f545ed35af',
                url: 'https://i.imgur.com/7f6s1n4.png',
                height: 100,
                width: 100
            }
        ]
    })

    const user = await prisma.user.createMany({
        data: [
            {
                id: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                name: 'ptan21',
                email: 'ptan21@clc.fitus.edu.vn',
                role: 'admin',
                avartarId: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                //12340000@N
                password: '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2'
            },
            {
                id: '9ca710f0-4c11-411c-8aaf-78f545ed35af',
                name: 'phgb21',
                email: 'phgb21@clc.fitus.edu.vn',
                role: 'admin',
                avartarId: '9ca710f0-4c11-411c-8aaf-78f545ed35af',
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
                id: 'c6dddee3-5b56-48d8-8648-a6770e02dd83',
                name: 'Liên Hoa Ngự Trà',
                price: 120000,
                description: 'Liên Hoa Ngự Trà',
                categoryId: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                quantity: 10
            },
            {
                id: '75a47b13-3c3f-446e-910f-0f2de15a1f53',
                name: 'Gạo Lức Thất Tinh Hoa',
                price: 150000,
                description: 'Gạo Lức Thất Tinh Hoa',
                categoryId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb',
                quantity: 10
            },
            {
                id: '328da900-e8e1-4fbb-a44c-b92e0b134c26',
                name: 'Hibiscus Cam Quế',
                price: 90000,
                description: 'Hibiscus Cam Quế',
                categoryId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb',
                quantity: 10
            },
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316e',
                name: 'Trà An Yên Ngủ Ngon',
                price: 200000,
                description: 'Trà An Yên Ngủ Ngon',
                categoryId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7b7a',
                quantity: 10
            }
        ]
    })

    const ProductRating = await prisma.productRating.createMany({
        data: [
            {
                id: 'c6dddee3-5b56-48d8-8648-a6770e02dd83',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                productId: 'c6dddee3-5b56-48d8-8648-a6770e02dd83',
                rating: 5,
                comment: 'Good'
            },
            {
                id: '75a47b13-3c3f-446e-910f-0f2de15a1f53',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                productId: '75a47b13-3c3f-446e-910f-0f2de15a1f53',
                rating: 4,
                comment: 'Good'
            }
        ]
    })

    const order = await prisma.order.createMany({
        data: [
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316p',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                status: 'pending',
                shippingAddress: '123/4/5'
            },
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316g',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                status: 'processing',
                shippingAddress: '123/4/5'
            },
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316h',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                status: 'completed',
                shippingAddress: '123/4/5'
            },
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316i',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                status: 'completed',
                shippingAddress: '123/4/5'
            }
        ]
    })

    const payment = await prisma.payment.createMany({
        data: [
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f631op',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                orderId: '83af4e16-ab06-4a77-9bd2-f63f78f6316g',
                status: 'pending',
                amount: 120000
            },
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f631fk',
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                orderId: '83af4e16-ab06-4a77-9bd2-f63f78f6316h',
                status: 'pending',
                amount: 150000
            }
        ]
    })

    const orderDetail = await prisma.orderDetail.createMany({
        data: [
            {
                orderId: '83af4e16-ab06-4a77-9bd2-f63f78f6316p',
                productOrigin: [
                    {
                        productId: '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4',
                        productName: 'Product 1',
                        productImage: 'https://i.imgur.com/7f6s1n4.png',
                        quantity: 1,
                        price: 120000
                    },
                    {
                        productId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb',
                        productName: 'Product 2',
                        productImage: 'https://i.imgur.com/7f6s1n4.png',
                        quantity: 1,
                        price: 150000
                    },
                    {
                        productId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb',
                        productName: 'Product 3',
                        productImage: 'https://i.imgur.com/7f6s1n4.png',
                        quantity: 2,
                        price: 90000
                    }
                ]
            },
            {
                orderId: '83af4e16-ab06-4a77-9bd2-f63f78f6316g',
                productOrigin: [
                    {
                        productId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb',
                        productName: 'Product 1',
                        productImage: 'https://i.imgur.com/7f6s1n4.png',
                        quantity: 1,
                        price: 90000
                    },
                    {
                        productId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb',
                        productName: 'Product 2',
                        productImage: 'https://i.imgur.com/7f6s1n4.png',
                        quantity: 1,
                        price: 150000
                    }
                ]
            },
            {
                orderId: '83af4e16-ab06-4a77-9bd2-f63f78f6316h',
                productOrigin: [
                    {
                        productId: '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb',
                        productName: 'Product 1',
                        productImage: 'https://i.imgur.com/7f6s1n4.png',
                        quantity: 1,
                        price: 150000
                    }
                ]
            }
        ]
    })

    const discount = await prisma.discount.createMany({
        data: [
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316g',
                code: 'Discount 1',
                percent: 10,
                start_at: new Date(),
                end_at: new Date()
            },
            {
                id: '83af4e16-ab06-4a77-9bd2-f63f78f6316h',
                code: 'Discount 2',
                percent: 20,
                start_at: new Date(),
                end_at: new Date()
            }
        ]
    })

    const cart = await prisma.cart.createMany({
        data: [
            {
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                productId: 'c6dddee3-5b56-48d8-8648-a6770e02dd83',
                quantity: 1
            },
            {
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                productId: '75a47b13-3c3f-446e-910f-0f2de15a1f53',
                quantity: 1
            },
            {
                userId: '0d3cd365-7cb6-4ead-a879-f71d919eb93d',
                productId: '83af4e16-ab06-4a77-9bd2-f63f78f6316e',
                quantity: 2
            }
        ]
    })

    console.log({ user, category, product, ProductRating, order, orderDetail, payment, discount, image, cart })
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
