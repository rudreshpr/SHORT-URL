//Statefull Authorization
// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

//StateLess Authorization

const jwt = require('jsonwebtoken');
const secret ="Rudresh@123#"
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret);
}
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
    
}

module.exports = {
    setUser,getUser
}