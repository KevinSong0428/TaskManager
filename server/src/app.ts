import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { TaskModel } from "./models/task";
import { v4 as uuidv4, validate as isUuidValid } from "uuid"
import { convertTypeAcquisitionFromJson } from "typescript";

// connect to mongoDB
mongoose.connect("mongodb://localhost:27017/task-manager");

// check if mongoose is connected to database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected!");
})


// NOT SUITABLE FOR PRODUCTION!!! Using this right now to clean up as we do not have sessions
const cleanUpDatabase = async () => {
    try {
        await TaskModel.deleteMany({});
        console.log("Database cleaned up successfully upon connection!")
    } catch (error) {
        console.error("Error cleaning up database upon connection: ", error);
    }
}
cleanUpDatabase();


const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors()); // middleware to prevent unauthorized access to resources on server from a different domain


// validate taskId properly
app.param('taskId', (req, res, next, taskId) => {
    if (!isUuidValid(taskId)) {
        res.status(400).json({ error: "Invalid Task ID" });
    } else {
        next();
    }
});


// routes
// creating tasks
app.post("/tasks", async (req: Request, res: Response) => {
    try {
        const taskData = req.body;
        console.log("POSTING: ", taskData);
        const createdTask = await TaskModel.create(taskData);
        res.status(200).json(createdTask)
    } catch (error) {
        console.log("Error creating task: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// read all tasks
app.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log("Error getting tasks: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// read single task
app.get("/tasks/:taskId", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        const task = await TaskModel.findOne({ id: taskId });
        if (!task) {
            res.status(404).json({ error: "Task not found." });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        console.log("Error finding single task: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// update task
app.put("/tasks/:taskId", async (req: Request, res: Response) => {
    try {
        let taskId = req.params.taskId.trim();

        const updatedTask = await TaskModel.findOneAndUpdate({ id: taskId }, req.body, { new: true });

        if (!updatedTask) {
            res.status(404).json({ error: "Task not found." });
            return;
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log("Error updating task: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// delete task
app.delete("/tasks/:taskId", async (req: Request, res: Response) => {
    try {
        let taskId = req.params.taskId.trim();
        console.log("Deleting: ", taskId);
        const deletedTask = await TaskModel.findOneAndDelete({ id: taskId });

        if (!deletedTask) {
            res.status(404).json({ error: "Task not found." });
            return;
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        console.log("Error deleting task: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



const server = app.listen(3000, () => {
    console.log("Server is up and running on port 3000!");
})

export { app, server };