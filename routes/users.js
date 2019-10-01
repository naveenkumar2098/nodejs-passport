const express = require('express');
const router = express.Router();

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
});

module.exports = router;