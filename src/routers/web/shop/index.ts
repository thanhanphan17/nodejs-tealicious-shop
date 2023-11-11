import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('shop/index')
})

router.get('/about-us', function (req, res, next) {
    res.render('shop/about-us')
})

export default router
