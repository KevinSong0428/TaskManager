import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button, TextField, Grid, Dialog, DialogContent, DialogActions, DialogTitle, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material"
import { Task, TaskType, TaskStatus } from "../types";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: Task) => void;
    selectedTask: Task | null;
}

const TaskFormDialog: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, selectedTask }) => {
    const [formData, setFormData] = useState({
        id: uuidv4(), // generate a unique ID if new task
        status: "To Start" as TaskStatus,
        type: "Design" as TaskType,
        title: "",
        description: "",
        subtitle: new Date().toLocaleDateString(),
    });

    useEffect(() => {
        if (selectedTask) {
            setFormData((prevData) => ({
                ...prevData,
                ...selectedTask,
            }));
        } else {
            // reset formData when selectedTask is null
            setFormData({
                id: uuidv4(),
                status: "To Start",
                type: "Design",
                title: "",
                description: "",
                subtitle: new Date().toLocaleDateString(),
            });
        }
    }, [selectedTask, open]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // prevent refreshing since it's a pop up form
        console.log("SUBMITTING: ", formData);
        // submit new or updated data
        onSubmit(formData);
        onClose();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }) as Task);
    }

    const formTitle = () => {
        if (selectedTask) {
            return "Edit Task"
        }
        return "Add Task"
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{formTitle()}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup
                                    row
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    aria-required="true"
                                >
                                    <FormControlLabel
                                        value="To Start"
                                        control={<Radio />}
                                        label="To Start"
                                    />
                                    <FormControlLabel
                                        value="In Progress"
                                        control={<Radio />}
                                        label="In Progress"
                                    />
                                    <FormControlLabel
                                        value="Done"
                                        control={<Radio />}
                                        label="Done"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Type</FormLabel>
                                <RadioGroup
                                    row
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value="Design"
                                        control={<Radio />}
                                        label="Design"
                                    />
                                    <FormControlLabel
                                        value="Front-end"
                                        control={<Radio />}
                                        label="Front-end"
                                    />
                                    <FormControlLabel
                                        value="Back-end"
                                        control={<Radio />}
                                        label="Back-end"
                                    />
                                    <FormControlLabel
                                        value="Devops"
                                        control={<Radio />}
                                        label="Devops"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                variant="filled"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Subtitle"
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button aria-label="Edit" type="submit" variant="contained" color="primary">
                            {formTitle()}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog>
    )

}

export default TaskFormDialog;