import '~/configs/config.init'

const DatabaseConfig = {
  host: (process.env.DB_HOST as string) || 'localhost',
  port: (process.env.DB_PORT as string) || '27017',
  user: (process.env.DB_USER as string) || 'root',
  dbname: (process.env.DB_DBNAME as string) || 'wander-stay-db',
  password: (process.env.DB_PASSWORD as string) || '0000'
}

export default DatabaseConfig
