import mongoose, { set } from 'mongoose'
import os from 'os'

const TIME_CHECKER = 30000 // 30 seconds

/**
 * Counts the number of connections in the mongoose.connections array and logs it to the console.
 *
 * @return {number} The number of connections in the mongoose.connections array.
 */
export const countConnection = () => {
    const numConnection = mongoose.connections.length
    console.log(`[DB]:::Current number of connections: ${numConnection}`)

    return numConnection
}

export const checkDBOverload = () => {
    setInterval(() => {
        const numConnection = countConnection()
        const numCore = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        console.log(`[DB]:::Current memory usage: ${(memoryUsage / (1024 * 1024)).toFixed(3)} MB`)

        const connectionLimit = numCore * 3

        if (numConnection > connectionLimit) {
            console.log(`[DB]:::Database overloaded`)
        }
    }, TIME_CHECKER)
}
