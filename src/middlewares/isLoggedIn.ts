export const isLoggedIn = (req: any, res: any, next: any) => {
    if (req.cookie.isLoggedIn) {
        return next()
    }
    res.redirect('/login')
}
