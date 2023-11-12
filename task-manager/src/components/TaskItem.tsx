import React, { useState } from "react";
import { Task as TaskInterface } from "../types";
import { Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

interface TaskProps {
    task: TaskInterface;
    handleEdit: (formData: TaskInterface) => void;
    handleDelete: (formData: TaskInterface) => void;
    sortingMethod: string;
}

const StyledCard = styled(Card)({
    marginBottom: 16,
});

const Task: React.FC<TaskProps> = ({ task, handleEdit, handleDelete, sortingMethod }) => {
    const { title, type, description, subtitle, status } = task;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const displayType = () => {
        if (sortingMethod === "status") {
            return (
                <Typography variant="body1">
                    Type: {type}
                </Typography>
            );
        }
        return (
            <Typography variant="body1">
                Status: {status}
            </Typography>
        );
    }

    return (
        <>
            <StyledCard key={task.id}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div" gutterBottom>
                            Title: {title}
                        </Typography>

                        <IconButton title="Edit" aria-label="Edit" onClick={() => handleEdit(task)}>
                            <EditIcon />
                        </IconButton>

                    </Box>
                    {displayType()}
                    <Typography
                        variant="body1"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            whiteSpace: 'normal'
                        }}>
                        Description: {description}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                        {subtitle}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={1}>
                        <Tooltip title="Expand" arrow>
                            <IconButton onClick={handleOpen}>
                                <ExpandCircleDownIcon style={{ fontSize: "large" }} />
                            </IconButton>
                        </Tooltip>


                        <IconButton title="Delete" aria-label="Delete" onClick={() => handleDelete(task)}>
                            <DeleteIcon />
                        </IconButton>

                    </Box>

                </CardContent>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle variant="h4" sx={{ padding: "16px 16px 0px 16px" }}>
                        {title}
                    </DialogTitle>
                    <ul>
                        <li>
                            <Typography variant="body1">
                                <b>Status: </b>{status}
                            </Typography>
                        </li>
                        <li><Typography variant="body1">
                            <b>Type: </b>{type}
                        </Typography></li>
                    </ul>
                    <DialogContent dividers sx={{ maxWidth: 600, minWidth: 400, margin: 0 }} >
                        <Typography variant="body1">
                            <b>Description:</b><br />
                            {description}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1" gutterBottom>
                            Subtitle: {subtitle}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" variant="contained">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </StyledCard>
        </>
    )
}

export default Task;
