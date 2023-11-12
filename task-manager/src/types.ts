export type TaskType = "Design" | "Front-end" | "Back-end" | "Devops";
export type TaskStatus = "To Start" | "In Progress" | "Done";

export interface Task {
    id: string;
    title: string;
    type: TaskType;
    description: string;
    subtitle: string; // can be date, or any smaller description
    status: TaskStatus;
}