import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose / Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
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
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema)