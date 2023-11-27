import Prisma from '~/dbs/init.prisma'
import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import AuthService from '~/services/auth.service'

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await AuthService.login({ email, password })
            if (!user) {
                return done(null, false)
            }

            return done(null, {
                user
            })
        } catch (error) {
            return done(null, false)
        }
    })
)

passport.serializeUser((user: any, done) => done(null, user.user))

passport.deserializeUser(async (user: any, done) => {
    try {
        const foundUser = await Prisma.user.findUnique({ where: { email: user.user.email } })
        if (foundUser) {
            done(null, user)
        }
        done(null, false)
    } catch (error) {
        done(null, false)
    }
})
