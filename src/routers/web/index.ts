import express from 'express'
import healthCheckRouter from '~/routers/web/health-check'
import home from '~/routers/web/shop/index'


const router = express.Router()


router.use('/', home) 
router.use('/aboutus', aboutus) 
router.use('/cart', cart) 
router.use('/checkout', checkout) 
router.use('/contact', contact) 
router.use('/login', login) 
router.use('/signup', signup) 
router.use('/forgotpassword', forgotpassword) 
router.use('/pages', pages) 
router.use('/thankyou', thankyou) 

export default router
