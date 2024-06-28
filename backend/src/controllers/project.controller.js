import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "All fields are required")
    }
    const leader = req.user
    let projectPhotoLocalPath;
    if (req.file) {
        projectPhotoLocalPath = req.file.path
    }
    const projectPhoto = await uploadCloudinary(projectPhotoLocalPath)
    const project = await Project.create({
        name,
        description,
        leader,
        projectPhoto: projectPhoto?.url || "https://res.cloudinary.com/wittywebcloud/image/upload/v1719397844/iwlo5fenek8ltimtyu5o.jpg"
    })
    return res.status(200).json(new ApiResponse(200, project, "Project created successfully"))
})

const getAllMyProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ $or: [{ leader: req.user._id }, { members: req.user._id }] }).populate("leader")
    return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"))
})

const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find().populate("leader")
    return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"))
})

const getProjectsCreatedByLoggedInUser = asyncHandler(async (req, res) => {
    const projects = await Project.find({ leader: req.user._id }).populate("leader")
    return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"))
})

const getProjectsCreatedByUser = asyncHandler(async (req, res) => {
    const projects = await Project.find({ leader: req.params.userId }).populate("leader")
    return res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"))
})

const getprojectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.projectId).populate("leader members")
    return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"))
})

export { createProject, getAllMyProjects, getProjectsCreatedByUser, getAllProjects, getProjectsCreatedByLoggedInUser, getprojectById }