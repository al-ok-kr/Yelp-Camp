const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchError = require('../utils/catchError');
const user = require('../controllers/user')

router.route('/register')
    .get(user.registerForm)
    .post(catchError(user.createUser))

router.route('/login')
    .get(user.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout)

module.exports = router