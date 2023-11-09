import JWT from 'jsonwebtoken'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    REFRESH_TOKEN: 'refresh-token',
    X_CLIENT_ID: 'x-client-id',
    BEARER: 'Bearer '
}

const createTokenPair = async (payload: object, privateKey: JWT.Secret) => {
    const accessToken = await JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1 days'
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7 days'
    })

    return { accessToken, refreshToken }
}

export default createTokenPair
