import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    description: {
        type: String
    },
    projectPhoto: {
        type: String,
        default: "https://res.cloudinary.com/wittywebcloud/image/upload/v1719397844/iwlo5fenek8ltimtyu5o.jpg"
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    updationHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true
})

export const Project = mongoose.model('Project', projectSchema)