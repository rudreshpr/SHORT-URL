const express = require('express');
const router = express.Router();
const {handleGenerateShortUrl,handleRedirectUrl,handleAnalyticals} = require('../controller/url')

router.post('/',handleGenerateShortUrl);

router.get('/:shortId',handleRedirectUrl);

router.get('/analytics/:shortId',handleAnalyticals);

module.exports= router;