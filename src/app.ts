import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import webRouter from './routers/web'
import apiRouter from './routers/api'
import path from 'path'

import { create } from 'express-handlebars'
import { handle404Error, handleReturnError } from '~/middlewares/errorHandler'

import '~/dbs/init.mongoose'
import '~/dbs/init.prisma'

const app = express()

// init middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, 'assets')))

// Configure the template engine to use Handlebars
app.engine('hbs', create({ extname: '.hbs', defaultLayout: false, layoutsDir: 'views/' }).engine)
// Set the default view engine to Handlebars
app.set('view engine', 'hbs')
// Set the directory where views are located
app.set('views', 'src/views')

// init routes
app.use('/', webRouter)
app.use('/api', apiRouter)

app.use(handle404Error)
app.use(handleReturnError)
export default app
