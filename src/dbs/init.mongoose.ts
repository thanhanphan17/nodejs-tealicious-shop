import mongoose from 'mongoose'
import config from '~/configs/config.database'
import { checkDBOverload } from '~/helpers/check.mongodb'

const localUri =
    `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.dbname}` +
    `?authSource=admin&readPreference=primary&ssl=false&directConnection=true`

const cloudURI = `mongodb+srv://${config.user}:${config.password}@${config.host}/${config.dbname}?retryWrites=true`

const uri = config.port === null ? cloudURI : localUri

class Mongoose {
    private static instance: Mongoose
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
            console.log(`[MONGOOSE]:::Start connecting to Mongoose...`)
            await mongoose.connect(this.uri, {
                maxPoolSize: 50
            })

            console.log(`[MONGOOSE]:::Connect to Mongoose successfully!`)
            checkDBOverload()
        } catch (err) {
            console.error(`[MONGOOSE]:::${err}`)
        }
    }

    /**
     * Returns an instance of the Database class.
     * If an instance does not exist, it creates one and returns it.
     * @param {string} uri - The URI of the database.
     * @returns {Database} - An instance of the Database class.
     */
    public static getInstance(uri: string): Mongoose {
        // Check if an instance already exists
        if (!Mongoose.instance) {
            // Create a new instance if it doesn't exist
            Mongoose.instance = new Mongoose(uri)
        }

        // Return the instance
        return Mongoose.instance
    }
}

export default Mongoose.getInstance(uri)
