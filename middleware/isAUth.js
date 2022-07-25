export const isAuth = (req, res, next) => {
    if (!req.session) {
        return res.redirect('/login');
    } else {
        res.redirect('/');
    }
    next();
};
