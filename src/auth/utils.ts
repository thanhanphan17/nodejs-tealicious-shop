import JWT from 'jsonwebtoken'

export const createTokenPair = async (payload: object, privateKey: JWT.Secret) => {
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
