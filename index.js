const express = require('express');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
const {connectToMongoDB}= require('./connect');
const path = require('path');
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/url',urlRoute);
app.use('/',staticRoute);
app.use('/user', userRoute);

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));



app.listen(PORT,()=>{console.log(`Server Started at Port ${PORT}`)});