
const user = require('../model/user');
const {v4:uuidv4} = require('uuid');
const {getUser,setUser} = require('../service/auth');

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await user.create({
        name,
        email,
        password
    });
    return res.redirect('/');
}


async function handleUserLogin(req, res) {
    const {  email, password } = req.body;
    const User = await user.findOne({email,password});
    if(!User){
        return res.render("login",{
            error:"Invalid User or Password",
        })
        
    }
    // const sessionId = uuidv4();
    // setUser(sessionId,User);
    // res.cookie('uid',sessionId);
    const token = setUser(User);
    res.cookie('uid',token);
    return res.redirect('/');
}

module.exports = { handleUserSignUp, handleUserLogin}