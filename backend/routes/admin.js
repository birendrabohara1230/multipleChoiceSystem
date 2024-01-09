const { Router } = require("express")
const { adminSignup } = require("../types")
const { Admin } = require("../model/admin.model")
const jwt = require("jsonwebtoken")
const {adminMiddleware, adminExists} = require("../middlewares/admin.middlewares")
const router = Router()


router.post("/signup", adminExists, (req, res) => {
    const adminPayLoad = req.body
    const parsedAdminPayLoad = adminSignup.safeParse(adminPayLoad)
    if (!parsedAdminPayLoad.success) {
        res.status(411).json({
            message: "Invaild input"
        })
        return;
    }
    const username = adminPayLoad.username
    const password = adminPayLoad.password
    Admin.create({
        username,
        password,
    })
        .then(function () {
            res.status(200).json({
                message: "Admin created successfully"
            })
            return;
        })
})

router.post("/signin", adminMiddleware, (req, res) => {
    try {
        const username = req.body.username
        const jwtToken = jwt.sign({
            username,
        }, process.env.JWT_SECRET)

        const options = {
            httpOnly: true,
            secure: true
        }
        res.status(200)
        .cookie("accessToken", jwtToken,  options)
        .json({
            token: jwtToken
        })
    } catch (error) {
        res.json({
            error,
        })
    }
})





module.exports = router
