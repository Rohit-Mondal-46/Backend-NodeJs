// const { getUser } = require("../service/Auth"); ////StateFull auth
const { getUser } = require("../service/authStateLess");

function authentication(req,res,next){
    const token = req.cookies?.token;
    req.user = null
    if(!token)
        return next();
    const user = getUser(token);
    req.user = user;
    return next();
}


function restrictedTo(roles){
    return function (req,res,next){
        if(!req.user) 
            return res.redirect('/user/login');
        if(!roles.includes(req.user._doc.role))
            return res.end("UnAuthorized");
        return next();
    }
}


// async function AccessToLoggedOnly(req,res,next){
//     const userUid = req.cookies.uid;
//     if(!userUid)
//         return res.redirect('/user/login');
//     const user = getUser(userUid);
//     if(!user)
//         return res.redirect('/user/login');
//     req.user = user
//     next();
// }

// async function authStatus(req,res,next){
//     const userUid = req.cookies?.uid;
//     const user = getUser(userUid);
//     console.log(user);
//     if(!user)
//         return res.redirect('/user/login');
//     req.user = user
//     next();
// }


module.exports = {authentication,restrictedTo};