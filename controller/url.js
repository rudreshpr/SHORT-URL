const shortid = require('shortid');
const url = require('../model/url');

async function handleGenerateShortUrl(req, res){
    const shortId = shortid();
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    await url.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
  return res.json({id:shortId});
}

async function handleRedirectUrl(req, res){
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate({
    shortId
  },{$push:{
    visitHistory:{
      timestamp:Date.now(),
    }
  }});
  res.redirect(entry.redirectURL);
}

async function handleAnalyticals(req,res){
  const shortId= req.params.shortId;
  const result = await url.findOne({shortId});
  return res.json({totalClick: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports={handleGenerateShortUrl,handleRedirectUrl,handleAnalyticals}