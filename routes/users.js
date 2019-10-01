const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/users');

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})

//register handle
router.post('/register',(req,res)=>{
    const {
        name,email,password,password2
    } = req.body;
    let errors = []

    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields'});
    }
    //check password match
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match'});
    }
    //check pass length
    if(password.length < 8){
        errors.push({ msg: 'Password should be atleast 8 characters'});
    }
    if(errors.length>0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //validation pass
        User.findOne({email: email})
        .then(user =>{
            if(user) {
                //user exists
                errors.push({msg:'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                
                //hash password
                bcrypt.genSalt(10, (err,salt)=> {
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) throw err;
                        // set pass to hashed
                        newUser.password = hash;
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg', 'You are now Registered');
                            res.redirect('/users/login');
                        })
                        .catch(err=> console.log(err));
                    })
                })
            }
        })
    }
});

//login handle
router.post('/login',(req,res, next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req, res, next);
});

//logout handle
router.get('/logout',(req, res)=>{
    req.logout();
    req.flash('success_msg', 'Successfully Logged Out');
    res.redirect('/users/login');
})

module.exports = router;