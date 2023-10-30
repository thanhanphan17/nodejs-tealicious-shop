import express from 'express'

const router = express.Router()

router.get('/api/health-check', (req, res) => {
  res.send({
    message: 'Hello, world!',
    statuscode: 200
  })
})

export default router
