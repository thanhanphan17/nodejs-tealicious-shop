export const isLogined = (req: any, res: any, next: any) => {
    if (req.cookie.isLogined) {
        return next()
    }
    res.redirect('/login')
}
