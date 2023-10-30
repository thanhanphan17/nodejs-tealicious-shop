import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import '~/dbs/init.mongodb'

const app = express()

// init middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init routes

// init database

export default app
