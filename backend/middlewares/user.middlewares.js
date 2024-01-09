const User = require("../model/user.model")

async function userExists(req, res, next){
    const username = req.body.username
    const user = await User.findOne({
        username,
    })
    if(user){
        res.status(409).json({
            message: "User with this name already exits"
        })
        return;
    }else{
        next()
    }
}

async function  userMiddleware(req, res, next){
    const username = req.body.username
    const password = req.body.password
    const user = await User.findOne({
        username,
        password
    })
    if(!user){
        res.status(403).json({
            message: "User with this name does not exits"
        })
        return;
    }else{
        next()
    }
}

module.exports = {userExists, userMiddleware}
