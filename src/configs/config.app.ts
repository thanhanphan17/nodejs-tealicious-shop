import '~/configs/config.init'

const AppConfig = {
  port: (process.env.APP_PORT as string) || 3000
}

export default AppConfig
