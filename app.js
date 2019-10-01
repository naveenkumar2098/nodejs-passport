const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//db config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(err=>console.log(err));

app.use(express.urlencoded());

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));