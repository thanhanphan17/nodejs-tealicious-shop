import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import webRouter from './routers/web/__index__'
import apiRouter from './routers/api/__index__'

import { create } from 'express-handlebars'
import { handle404Error, handleReturnError } from '~/middlewares/errorHandler'

import '~/lib/passport'
import '~/dbs/init.prisma'
import '~/dbs/init.mongoose'

const app = express()

// Configure the template engine to use Handlebars
app.engine(
    'hbs',
    create({
        extname: '.hbs',
        defaultLayout: false,
        layoutsDir: 'views/',
        helpers: {
            // Define a custom helper for addition
            add: function (num1: any, num2: any) {
                return num1 + num2
            },

            multiply: function (num1: any, num2: any) {
                return num1 * num2
            }
        }
    }).engine
)
// Set the default view engine to Handlebars and Jade
app.set('view engine', 'hbs')
app.set('view engine', 'jade')

// Set the directory where views are located
app.set('views', 'src/views')

// Init middlewares
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || 'secret',
        cookie: {
            maxAge: 1000 * 20
        },
        store: new session.MemoryStore()
    })
)

app.use(cors())
app.use(morgan('dev'))
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(passport.session())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))

// Init routes
app.use('/', webRouter)
app.use('/api', apiRouter)

// Middlewares handle errors
app.use(handle404Error)
app.use(handleReturnError)

export default app
