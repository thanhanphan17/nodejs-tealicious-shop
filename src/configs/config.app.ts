const AppConfig = {
    port: (process.env.APP_PORT as string) || 3000,
    apiURL: (process.env.API_URL as string) || ''
}

export default AppConfig
