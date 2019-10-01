const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//db config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(err=>console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//bodyparser
app.use(express.urlencoded({extended:false}));

//Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized: true,
}))

//Connect Flash
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));