import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types"

interface TaskState {
    toStart: Task[];
    inProgress: Task[];
    done: Task[];
    design: Task[];
    frontend: Task[];
    backend: Task[];
    devops: Task[];
    [key: string]: Task[]; //index signature
}

const initialState: TaskState = {
    toStart: [],
    inProgress: [],
    done: [],
    design: [],
    frontend: [],
    backend: [],
    devops: [],
};

const categories = {
    status: ["To Start", "In Progress", "Done"],
    type: ["Design", "Front-end", "Back-end", "Devops"],
};

const allStatus: { [key: string]: string } = {
    "To Start": "toStart",
    "In Progress": "inProgress",
    "Done": "done"
}

const allType: { [key: string]: string } = {
    "Design": "design",
    "Front-end": "frontend",
    "Back-end": "backend",
    "Devops": "devops"
}

// used to manage tasks
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            const { type, status } = action.payload;
            if (status === "To Start") {
                state.toStart.push(action.payload);
            } else if (status == "In Progress") {
                state.inProgress.push(action.payload);
            } else if (status == "Done") {
                state.done.push(action.payload);
            }

            // add based on type in order to sort 
            if (type == "Design") {
                state.design.push(action.payload);
            } else if (type == "Front-end") {
                state.frontend.push(action.payload);
            } else if (type == "Back-end") {
                state.backend.push(action.payload);
            } else if (type == "Devops") {
                state.devops.push(action.payload);
            }
        },
        // add add other actions for updating and deleting tasks


        updateTask: (state, action: PayloadAction<Task>) => {
            const { id } = action.payload;

            const updateCategory = (state: TaskState, categoryKey: keyof TaskState, id: string, updatedTask: Task, key: string) => {
                const foundTaskIndex = state[categoryKey].findIndex(task => task.id === id);
                if (foundTaskIndex !== -1) {
                    state[categoryKey].splice(foundTaskIndex, 1);

                    // key to update is either type or status
                    const updatedKey = key === "status" ? allStatus[updatedTask.status] : allType[updatedTask.type]

                    if (updatedKey && state[updatedKey]) {
                        state[updatedKey].push(updatedTask);
                    }
                }
            };


            // find the task by STATUS and update task
            for (const categoryKey of categories.status) {
                const statusKey = allStatus[categoryKey];
                if (statusKey && state[statusKey].some((task) => task.id === id)) {
                    updateCategory(state, statusKey, id, action.payload, "status");
                    break;
                }
            }

            // find the task by TYPES and update
            for (const categoryKey of categories.type) {
                const typeKey = allType[categoryKey]
                if (typeKey && state[typeKey].some((task) => task.id === id)) {
                    updateCategory(state, typeKey, id, action.payload, "type");
                    break;
                }
            }
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const deleteFromCategory = (state: TaskState, categoryKey: keyof TaskState, id: string) => {
                const foundTaskIndex = state[categoryKey].findIndex(task => task.id === id);
                if (foundTaskIndex !== -1) {
                    state[categoryKey] = state[categoryKey].filter((task) => task.id !== id);
                }
            };

            // find from task and remove from STATUS list
            for (const categoryKey of categories.status) {
                const statusKey = allStatus[categoryKey]
                if (statusKey && state[statusKey].some((task) => task.id === id)) {
                    deleteFromCategory(state, statusKey, id);
                    break;
                }
            }

            // find from task and remove from TYPE lists 
            for (const categoryKey of categories.type) {
                const typeKey = allType[categoryKey]
                if (typeKey && state[typeKey].some((task) => task.id === id)) {
                    deleteFromCategory(state, typeKey, id);
                    break;
                }
            }
        }
    }
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;