const User = require('../models/user')

module.exports.registerForm = (req, res) => {
    res.render('users/register')
}
module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('sucess', 'Welcome To Yelp-Camp')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}
module.exports.loginForm = (req, res) => {
    res.render('users/login')
}
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('sucess', 'Sucessfully Logged out')
    res.redirect('/')
}
module.exports.login = (req, res) => {
    req.flash('sucess', 'Welcome Back')
    const url = req.session.returnTo || '/'
    delete req.session.returnTo;
    res.redirect(url)
}