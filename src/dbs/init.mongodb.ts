import mongoose from 'mongoose'
import DatabaseConfig from '~/configs/config.database'
import { checkDBOverload } from '~/helpers/check.mongodb'

const uri =
  `mongodb+srv://${DatabaseConfig.user}:${DatabaseConfig.password}` +
  `@${DatabaseConfig.host}/${DatabaseConfig.dbname}?retryWrites=true&w=majority`

class Database {
  private static instance: Database
  private uri: string

  /**
   * Class constructor.
   *
   * @param {string} uri - The URI to be assigned to the `uri` property.
   */
  constructor(uri: string) {
    // Assign the URI to the `uri` property
    this.uri = uri

    // Connect to the database
    this.connect()
  }

  /**
   * Connects to the database using the specified URI.
   *
   * @return {Promise<void>} A promise that resolves when the connection is established.
   */
  async connect() {
    try {
      console.log(`[DB]:::Start connecting to MongoDB...`)
      await mongoose.connect(this.uri, {
        maxPoolSize: 50
      })

      console.log(`[DB]:::Connect to MongoDB successfully!`)
      checkDBOverload()
    } catch (err) {
      console.error(`[DB]:::${err}`)
    }
  }

  /**
   * Returns an instance of the Database class.
   * If an instance does not exist, it creates one and returns it.
   * @param {string} uri - The URI of the database.
   * @returns {Database} - An instance of the Database class.
   */
  public static getInstance(uri: string): Database {
    // Check if an instance already exists
    if (!Database.instance) {
      // Create a new instance if it doesn't exist
      Database.instance = new Database(uri)
    }

    // Return the instance
    return Database.instance
  }
}

const databaseInstace = Database.getInstance(uri)

export default databaseInstace
