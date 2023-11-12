import request from "supertest";
import { app, server } from "../src/app";
import mongoose from "mongoose";
import { after } from "node:test";

describe("Task Manager API", () => {
    let createdTaskId!: string;

    test("should create a new task", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
                title: "Test Task",
                type: "Design",
                description: "Test description",
                subtitle: "Test subtitle",
                status: "To Start",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        createdTaskId = response.body.id;
    });

    test("should get all tasks", async () => {
        const response = await request(app).get("/tasks");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test("should get a single task", async () => {
        const response = await request(app).get(`/tasks/${createdTaskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdTaskId);
    });

    test("should update a task", async () => {
        const response = await request(app)
            .put(`/tasks/${createdTaskId}`)
            .send({
                title: "Updated Task",
                type: "Front-end",
                description: "Updated description",
                subtitle: "Updated subtitle",
                status: "In Progress",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdTaskId);
        expect(response.body.title).toBe("Updated Task");
    });

    test("should delete a task", async () => {
        const response = await request(app).delete(`/tasks/${createdTaskId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", createdTaskId);
    });

    // cleanup after all tests have run
    afterAll(async () => {
        // close mongoDB connection
        await mongoose.disconnect();

        if (server) {
            server.close();
        }
    });
});
