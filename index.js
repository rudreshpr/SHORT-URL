const express = require('express');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {connectToMongoDB}= require('./connect');
const path = require('path');
const { restrictToLoggedInUserOnly,checkAuth } = require('./middleware/auth');
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());
app.use('/url',restrictToLoggedInUserOnly,urlRoute);
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);


app.set('view engine','ejs');
app.set('views',path.resolve('./views'));



app.listen(PORT,()=>{console.log(`Server Started at Port ${PORT}`)});