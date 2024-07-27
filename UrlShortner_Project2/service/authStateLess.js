const jwt = require('jsonwebtoken');
const key = '1r2m#$%'
function setUser(user){
    const payload = {
        ...user
        // id : user._id,
        // email:user.email
    }
    const token = jwt.sign(payload,key)
    return token;
}

function getUser(token){
    try {
        const user = jwt.verify(token,key);
        return user;
    } catch (error) {
        console.log('invalid token', error.message)
        return null;
    }
}

module.exports = {setUser,getUser}