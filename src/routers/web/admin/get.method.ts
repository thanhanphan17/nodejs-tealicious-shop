import express from 'express'
import productController from '~/controllers/web/product.controller'
import categoryController from '~/controllers/web/category.controller'
import { isAdminLoggedInSuccess } from '~/middlewares/loginSuccess'
import orderController from '~/controllers/web/order.controller'
import userController from '~/controllers/web/user.controller'

const router = express.Router()

router.get('/dashboard', isAdminLoggedInSuccess, (req, res, next) => {
    const customerName = req.cookies.adminName
    res.render('admin/index.hbs', { customerName })
})

router.get('/user', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    let listAccount = null
    listAccount = await userController.getListAccount(req, res, next)
    if (listAccount) {
        for (let i = 0; i < listAccount.users.length; i++) {
            if (!listAccount.users[i].address || listAccount.users[i].address === 'undefined') {
                listAccount.users[i].address = ' '
            }

            const date = new Date(listAccount.users[i].createdAt)
            const formattedDate = date.toLocaleDateString()
            listAccount.users[i].createdAt = formattedDate
        }
        console.log(listAccount)
        res.render('admin/user.hbs', { customerName, listAccount })
    }
})

router.get('/category', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    const category = await categoryController.listCategories(req, res, next)
    console.log(category)
    res.render('admin/category.hbs', { category, customerName })
})

router.get('/add-category', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/add-category.hbs', { customerName })
})

router.get('/product', isAdminLoggedInSuccess, async (req, res, next) => {
    req.query.status = 'all'
    const productList = await productController.listProduct(req, res, next)
    const customerName = req.cookies.adminName
    res.render('admin/product.hbs', { productList, customerName })
})

router.get('/order', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    let listOrder = null
    listOrder = await orderController.getAllOrders(req, res, next)
    if (listOrder) {
        console.log(listOrder)
        for (let i = 0; i < listOrder.length; i++) {
            if (listOrder[i].payment.status === 'pending') {
                listOrder[i].payment.status = 'Thanh toán khi nhận hàng'
            }

            if (listOrder[i].payment.status === 'failed') {
                listOrder[i].payment.status = 'Thanh toán thất bại'
            }

            if (listOrder[i].payment.status === 'pending') {
                listOrder[i].payment.status = 'Thanh toán thành công'
            }

            const date = new Date(listOrder[i].createdAt)
            const formattedDate = date.toLocaleDateString()
            listOrder[i].createdAt = formattedDate
        }
        res.render('admin/order.hbs', { customerName, listOrder })
    }
})

router.get('/', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    const isLoggedIn = req.cookies.isLoggedIn
    if (isLoggedIn) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login.hbs')
    }
})

router.get('/login-admin', function (req, res, next) {
    const customerName = req.cookies.adminName
    const isLoggedIn = req.cookies.isLoggedIn
    if (isLoggedIn) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login.hbs')
    }
})

router.get('/add-user', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/add-user.hbs', { customerName })
})

router.get('/add-product', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    const category = await categoryController.listCategories(req, res, next)
    res.render('admin/add-product.hbs', { category, customerName })
})

router.get('/update-product', isAdminLoggedInSuccess, async (req, res, next) => {
    const customerName = req.cookies.adminName
    const category = await categoryController.listCategories(req, res, next)
    const product = await productController.getProductById(req, res, next)
    console.log(product)
    res.render('admin/update-product.hbs', { customerName, product, category })
})

router.get('/add-order', isAdminLoggedInSuccess, function (req, res, next) {
    const customerName = req.cookies.adminName
    res.render('admin/add-order.hbs', { customerName })
})

router.get('/profile-admin', isAdminLoggedInSuccess, function (req, res, next) {
    const avatar = req.cookies.avatar
    const customerName = req.cookies.adminName
    const customerEmail = req.cookies.adminEmail
    const customerAddress = req.cookies.customerAddress
    res.render('admin/profile.hbs', { avatar, customerName, customerAddress, customerEmail })
})

export default router
