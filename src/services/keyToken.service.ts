import keyTokenModel from '~/models/keyToken.model'

class KeyTokenService {
    /**
     * Create a key token for a user.
     *
     * @param payload - The payload containing userId, publicKey.
     * @returns The created public key string if successful, otherwise null.
     */
    static async createKeyToken(payload: { userId: any; publicKey: any; refreshToken: any }) {
        try {
            const filter = { user: payload.userId }
            const update = { publicKey: payload.publicKey, refreshTokensUsed: [], refreshToken: payload.refreshToken }
            const options = { upsert: true, new: true }

            const token = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return token ? token.publicKey : null
        } catch (error) {
            // Log any errors that occur during the process
            console.error(error)
            return error
        }
    }

    /**
     * Finds a key token by user ID.
     *
     * @param {any} userId - The ID of the user.
     * @return {Promise<any>} A promise that resolves to the key token.
     */
    static async findByUserId(userId: any) {
        return await keyTokenModel.findOne({ user: userId }).lean()
    }

    /**
     * Removes a key by its ID.
     *
     * @param {any} Id - The ID of the key to be removed.
     * @return {Promise<any>} A promise that resolves to the removed key.
     */
    static async deleteKeyById(Id: any) {
        return await keyTokenModel.findByIdAndDelete(Id)
    }

    /**
     * Finds a key token by the given refresh token.
     *
     * @param {any} refreshToken - The refresh token to search for.
     * @return {Promise<any>} A promise that resolves to the key token found.
     */
    static async findByRefreshTokenUsed(refreshToken: any) {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }

    /**
     * Finds a key token by the provided refresh token.
     *
     * @param {any} refreshToken - The refresh token to search for.
     * @return {Promise<any>} A promise that resolves to the found key token.
     */
    static async findByRefreshToken(refreshToken: any) {
        return await keyTokenModel.findOne({ refreshToken })
    }
}

export default KeyTokenService
