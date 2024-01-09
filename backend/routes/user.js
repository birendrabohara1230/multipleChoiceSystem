const { Router } = require("express")
const User = require("../model/user.model")
const { userSignup } = require("../types")
const { userExists, userMiddleware } = require("../middlewares/user.middlewares")
const jwt = require("jsonwebtoken")

const router = Router()


router.post("/signup", userExists, function (req, res) {

    const userPayLoad = req.body
    const parsedPayLoad = userSignup.safeParse(userPayLoad)
    if (!parsedPayLoad.success) {
        res.status(411).json({
            message: "Invalid inputs"
        })
        return;
    }
    const fullName = userPayLoad.fullName
    const username = userPayLoad.username
    const password = userPayLoad.password
    const grade = userPayLoad.grade
    const gender = userPayLoad.gender
    const testStat = userPayLoad.testStat
    User.create({
        fullName,
        username,
        password,
        grade,
        gender,
    })
        .then(function () {
            res.status(200).json({
                message: "User created successfully"
            })
        })
        .catch(function (error) {
            res.json({
                error,
            })
        })
})

router.post("/signin", userMiddleware, (req, res) => {
    try {
        const username = req.body.username
        const jwtToken = jwt.sign({
            username,
        }, process.env.JWT_SECRET)
        res.status(200).json({
            token: jwtToken
        })
    } catch (error) {
        res.json({
            error,
        })
    }
})


module.exports = router
