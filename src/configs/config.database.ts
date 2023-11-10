const MongoConfig = {
    host: (process.env.MG_DB_HOST as string) || 'localhost',
    port: (process.env.MG_DB_PORT as string) || '27017',
    user: (process.env.MG_DB_USER as string) || 'root',
    dbname: (process.env.MG_DB_NAME as string) || 'tealicious_db',
    password: (process.env.MG_DB_PASSWORD as string) || '0000'
}

export default MongoConfig
