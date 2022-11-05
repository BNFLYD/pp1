const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn} = require('../lib/auth');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect:'/calc',
    failureRedirect:'/signup',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login',(req, res) =>{
    passport.authenticate('local.login',{
        successRedirect:'/calc',
        failureRedirect:'/login',
        failureFlash: true
    })(req, res);
})



router.get('/calc', isLoggedIn, (req, res) => {
    res.render('calc/add');
    
});

router.get("/logout", (req, res, next) => {
    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect("/");  
    });
});
module.exports = router;