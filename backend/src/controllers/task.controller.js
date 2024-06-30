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


export {
    createTask
}