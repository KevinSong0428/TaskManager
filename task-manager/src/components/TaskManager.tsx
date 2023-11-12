import React, { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import TaskItem from "./TaskItem";
import { Task } from "../types"
import "./TaskManager.css"
import { Button, Grid, Typography, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { addTask, deleteTask, updateTask } from "../redux/reducers/taskSlice";
import TaskFormDialog from "./TaskFormDialog";
import AddIcon from '@mui/icons-material/Add';

const TaskManager: React.FC = () => {
    const dispatch = useDispatch();
    const categories = {
        status: ["toStart", "inProgress", "done"],
        type: ["design", "frontend", "backend", "devops"],
    };
    const tasks = useSelector((state: RootState) => state.tasks);
    const apiUrl = "http://localhost:3000/tasks"

    // use state to track how user wants to sort task
    const [sortingMethod, setSortingMethod] = useState<"status" | "type">("status")
    // state to see if form visible or not
    const [isFormVisible, setisFormVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // handle what sorting method user selects
    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSortingMethod(e.target.value as "status" | "type");
    }

    const formatCategoryName = (category: string) => {
        return category
            .replace(/([A-Z])/g, ' $1') // add space before uppercase
            .trim() // remove leading and trailing white spaces
            .replace(/(^|\s)\S/g, (char) => char.toUpperCase()); // uppercase the first char of each word
    }

    // show form 
    const handleAddTask = async () => {
        console.log("ADDING TASKS!", selectedTask)
        await setSelectedTask(null);
        setisFormVisible(!isFormVisible);
    }

    // handle closing the form
    const handleFormClose = () => {
        setisFormVisible(false);
    }

    const makeApiRequest = async (url: string, method: string, body?: any) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error(`Failed to ${method.toLowerCase()} task: ${response.status}`)
            }
        } catch (error) {
            console.log(`Error ${method.toLowerCase()} task:`, error);
            throw error;
        }
    }

    // single page web application --> optimistic update
    // add tasks to redux state before sending the request
    const handleFormSubmit = async (formData: Task) => {
        console.log("HANDLING FORM SUBMIT: ", formData);
        try {
            // if selectedTask --> pop up form but it's EDITING not adding
            if (selectedTask && formData.id === selectedTask.id) {
                console.log("EDITING TASK-", formData.id)
                dispatch(updateTask(formData));
                await setSelectedTask(null);
                await makeApiRequest(`${apiUrl}/${formData.id}`, "PUT", formData);
            } else {
                // else we need to add a new task
                dispatch(addTask(formData));
                await makeApiRequest(apiUrl, "POST", formData)
            }
        } catch (error) {
            console.log("Error submitting form: ", error);
            dispatch(deleteTask(formData.id));
        }
        setisFormVisible(false)
    }

    // handle updating task
    const openEdit = (formData: Task) => {
        console.log("HANDLING UPDATE!")
        console.log(formData)
        setSelectedTask(formData);
        setisFormVisible(true);
    }

    const handleDeleteTask = async (formData: Task) => {
        console.log("DELETING!")
        try {
            dispatch(deleteTask(formData.id));
            await makeApiRequest(`${apiUrl}/${formData.id}`, "DELETE")
        } catch (error) {
            console.log("Error deleting task: ", error);
        }
    }

    return (
        <Grid container direction="column" spacing={2} >
            <Grid item container justifyContent="space-between" alignItems="center">
                <Typography variant="h3" style={{ margin: "0.25em" }}>
                    Task Manager
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    startIcon={<AddIcon fontSize="large" />}
                    style={{ margin: "1em" }}
                >
                    Add Task
                </Button>
            </Grid>

            <Grid item style={{ margin: "1em" }}>
                <FormLabel>Sort by: </FormLabel>
                <RadioGroup
                    row
                    value={sortingMethod}
                    onChange={handleRadioChange}
                    defaultValue={sortingMethod}
                >
                    <FormControlLabel
                        value="status"
                        control={<Radio color="primary" />}
                        label="Status"
                    />
                    <FormControlLabel
                        value="type"
                        control={<Radio color="primary" />}
                        label="Type"
                    />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} style={{ justifyContent: "space-evenly" }}>
                    {categories[sortingMethod].map((category) => (
                        <Grid item key={category} xs={12} sm={6} md={4} lg={3}>
                            <div className="column">
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 600 }}
                                >
                                    {formatCategoryName(category)}
                                </Typography>
                                {tasks[category]?.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        handleEdit={openEdit}
                                        handleDelete={handleDeleteTask}
                                        sortingMethod={sortingMethod}
                                    />
                                ))}
                                {tasks[category]?.length === 0 &&
                                    <Typography variant="subtitle1" color="textSecondary">
                                        No tasks in this category.
                                    </Typography>}
                            </div>
                        </Grid>
                    ))}
                </Grid>

                {/* render form if isFormVisible is true */}
                <TaskFormDialog open={isFormVisible} onClose={handleFormClose} onSubmit={handleFormSubmit} selectedTask={selectedTask} />
            </Grid>
        </Grid >
    )
}

export default TaskManager;