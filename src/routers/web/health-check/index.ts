import axios from 'axios'
import express from 'express'
import AppConfig from '~/configs/config.app'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('shop/index', {})
})

router.get('/', (req, res) => {
    res.render('shop/index', {})
})

export default router
