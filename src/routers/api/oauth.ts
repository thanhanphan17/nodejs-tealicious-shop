import axios from 'axios'
import express from 'express'
import OAuthService from '~/services/oauth.service'

const router = express.Router()

const getGoogleUser = async (payload: { id_token: any; access_token: any }) => {
    const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        params: {
            access_token: payload.access_token,
            alt: 'json'
        },
        headers: {
            Authorization: `Bearer ${payload.id_token}`
        }
    })
    return data
}

const getOauthGooleToken = async (code: string) => {
    const body = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_AUTHORIZED_REDIRECT_URI,
        grant_type: 'authorization_code'
    }
    const { data } = await axios.post('https://oauth2.googleapis.com/token', body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return data
}

router.get('/google', async (req, res, next) => {
    try {
        const { code } = req.query
        const data = await getOauthGooleToken(code as string)
        const { id_token, access_token } = data
        const googleUser = await getGoogleUser({ id_token, access_token })

        const googleUserName = googleUser.name
        const googleUserEmail = googleUser.email
        const googleUserAvatar = googleUser.picture

        const info = await OAuthService.getUserOAuth(googleUserEmail, googleUserName, googleUserAvatar)

        res.redirect(
            `${process.env.GOOGLE_CLIENT_REDIRECT_URL}` +
                `?access_token=${info?.tokens?.accessToken}&refresh_token=${info?.tokens?.refreshToken}`
        )
    } catch (error) {
        next(error)
    }
})

export default router
