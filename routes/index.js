const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

//wlecome page
router.get('/', (req,res)=>{
    res.render('welcome');
})

//dashboard
router.get('/dashboard', (req,res)=>{
    res.render('dashboard',{
        name: req.user.name
    });
})

module.exports = router;