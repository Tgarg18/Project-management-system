import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, userName, password } = req.body
    if (
        [fullName, email, userName, password].some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { userName }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        userName
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "User creation failed")
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "100d"
    })

    if (!token) {
        throw new ApiError(500, "Failed to generate access token")
    }
    return res.status(200).json(
        {
            status: 200,
            message: "User created successfully",
            user: createdUser,
            token: token
        }
    )
})

const registerUserStage2 = asyncHandler(async (req, res) => {
    console.log(req.user);
    const { bio } = req.body;

    let avatarLocalPath;
    if (req.file) {
        avatarLocalPath = req.file.path;
    }

    const avatar = await uploadCloudinary(avatarLocalPath)

    const updateduser = await User.findByIdAndUpdate(req.user._id, {
        bio,
        avatar: avatar?.url || "https://res.cloudinary.com/wittywebcloud/image/upload/v1718627988/userimage_hwokq2.png"
    }, { new: true }
    )
    if (!updateduser) {
        console.log("User update failed");
        throw new ApiError(500, "User update failed")
    }
    const user = updateduser.select("-password")
    return res.status(200).json(
        new ApiResponse(200, user, "User updated successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body;
    if (!(userName || email)) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Email and username is required"))
    }
    const user = await User.findOne({ $and: [{ email }, { userName }] })
    if (!user) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "User does not exist"))
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "invalid credentials"))
    }
    const loggedInUser = await User.findById(user._id).select("-password");

    const token = jwt.sign({ _id: loggedInUser._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "100d"
    })

    if (!token) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Server side error"))
    }
    return res.status(200).json(
        {
            status: 200,
            message: "User logged in successfully!",
            user: loggedInUser,
            token: token
        }
    )
})

const getCurrentUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")
    return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"))
})

const getUserData = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const user = await User.findById(userId).select("-password")
    return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"))
})

const removeProfilePhoto = asyncHandler(async (req, res) => {
    const userId = req.body.userid;
    const user = await User.findByIdAndUpdate(userId, {
        avatar: "https://res.cloudinary.com/wittywebcloud/image/upload/v1718627988/userimage_hwokq2.png"
    }, { new: true })
    return res.status(200).json(new ApiResponse(200, user, "Profile photo removed successfully"))
})

const changeUserData = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { bio } = req.body;

    let avatarLocalPath;
    if (req.file) {
        avatarLocalPath = req.file.path;
    }

    const avatar = await uploadCloudinary(avatarLocalPath)

    const user = await User.findByIdAndUpdate(userId, {
        bio,
        avatar: avatar?.url
    }, { new: true })
    return res.status(200).json(new ApiResponse(200, user, "User data updated successfully"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    // check if user exists
    // check if old password is correct
    // check if new password is valid
    // change password
    // return response
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Old password is incorrect")
    }

    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully!"))
})

export {
    registerUser,
    registerUserStage2,
    loginUser,
    getUserData,
    changeCurrentPassword,
    getCurrentUserData,
    removeProfilePhoto,
    changeUserData
}