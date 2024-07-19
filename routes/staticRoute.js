const express = require('express');
const router = express.Router();
const url = require('../model/url');

router.get('/', async (req, res) => {
    const allUrls = await url.find({});
    return res.render('home', {
        urls: allUrls,
    });
})

router.get('/signup', (req, res) => {
    return res.render('signup');
})


module.exports= router;