import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
    const { title, description, assignedIn, assignedTo } = req.body;
    if (!title || !description || !assignedIn || !assignedTo) {
        throw new ApiError(400, "All fields are required")
    }
    const task = await Task.create({
        title,
        description,
        assignedIn,
        assignedTo,
        status: "in_progress"
    })
    return res.status(200).json(new ApiResponse(200, task, "Task created successfully"))
})

const completeTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const task = await Task.findById(taskId)
    if (!task) {
        throw new ApiError(404, "Task not found")
    }
    task.status = "completed"
    await task.save()
    return res.status(200).json(new ApiResponse(200, task, "Task completed successfully"))
})

const incompleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const task = await Task.findById(taskId)
    if (!task) {
        throw new ApiError(404, "Task not found")
    }
    task.status = "in_progress"
    await task.save()
    return res.status(200).json(new ApiResponse(200, task, "Task uncompleted successfully"))
})

const getMyTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user._id, assignedIn: req.params.projectId })
    return res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"))
})

const getAllCompletedTasksinProject = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ assignedIn: req.params.projectId, status: "completed" })
    return res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"))
})



export {
    createTask,
    completeTask,
    incompleteTask,
    getMyTasks,
    getAllCompletedTasksinProject
}
