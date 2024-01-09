const { Admin } = require("../model/admin.model");
const { adminSignup } = require("../types");
const jwt = require("jsonwebtoken")


async function adminExists(req, res, next) {
    const username = req.body.username
    const admin = await Admin.findOne({
        username,
    })
    if (admin) {
        res.status(409).json({
            message: "Admin with this name already exits"
        })
        return
    } else {
        next()
    }
}



function adminMiddleware(req, res, next) {
    let username;
    try {
        if(req.body.username){
            username = req.body.username
            console.log("ram");
        }else{
            const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET)
            console.log(decoded);
            username = decoded.username
        }
        Admin.findOne({
            username,
        })
            .then(function (admin) {
                if (admin) {
                    next()
                } else {
                    res.status(403).json({
                        message: "Admin does not exists"
                    })
                }
                return;
            })
    } catch (error) {
        res.status(403).json({
            error,
        })
    }
}

module.exports = { adminMiddleware, adminExists }
