import axios from 'axios'
import express from 'express'
import AppConfig from '~/configs/config.app'

const router = express.Router()

router.get('/health-check', (req, res) => {
    axios.get(`${AppConfig.apiURL}/api/health-check`).then((response) => {
        console.log(response.data)
        res.render('health-check', { data: response.data })
    })
})

export default router
