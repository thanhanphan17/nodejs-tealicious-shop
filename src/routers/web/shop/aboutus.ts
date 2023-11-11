import express from 'express'
import AppConfig from '~/configs/config.app'

const router = express.Router()

router.get('/', function(req, res, next) {
    res.render('shop/about-us');
  });


export default router