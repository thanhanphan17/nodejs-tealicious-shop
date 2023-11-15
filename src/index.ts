import app from './app'
import AppConfig from '~/configs/config.app'

const server = app.listen(AppConfig.port, () => {
    console.log(`[SERVER]:::listening on port: ${AppConfig.port}`)
})

process.on('SIGINT', () => {
    server.close(() => console.log(`Exit sever express successfully!`))
    process.exit(0)
})
