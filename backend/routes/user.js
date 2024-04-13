const express = require("express");
const { User } = require("../db");
const zod = require("zod");
const JWT = require("jsonwebtoken");
const { JWT_Secret } = require("../config");
const { profileRouter } = require("./profile");
const { authMiddleware } = require("../middleware");

const userSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    address: zod.string(),
    wishlist: zod.array(),
    cart: zod.array(),
    orders: zod.array()
})

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const user = req.body

    // if (!userSchema.safeParse(user)) {
    //     return res.status(411).json({
    //         message: "Invalid Inputs!!"
    //     })
    // }

    if (await User.findOne({ email: user.email })) {
        return res.status(411).json({
            message: "User already exsits"
        })
    }

    const newUser = await User.create({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        wishlist: [],
        cart: [],
        orders: []
    });
    const userId = newUser._id
    console.log(userId);
    const token = JWT.sign({ userId: userId }, JWT_Secret);

    return res.status(200).json({
        message: 'User Created.',
        token: token
    })
});

userRouter.post("/signin", async (req, res) => {
    // if (!userSchema.safeParse(req.body)) {
    //     return res.status(411).json({
    //         message: "Invalid input!"
    //     })
    // }

    const isUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (!isUser) {
        return res.status(411).json({
            message: "User does not exists"
        })
    }

    const token = await JWT.sign({ userId: isUser._id }, JWT_Secret);

    return res.status(200).json({
        token
    })
});

// Create a middleware
// userRouter.use("/profile", authMiddleware , profileRouter)

module.exports = { userRouter }