import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String, // will use a cloudinary url
        default: "https://res.cloudinary.com/wittywebcloud/image/upload/v1718627988/userimage_hwokq2.png"
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)
