import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler((req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" })
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata
            next();
        })
    })
})