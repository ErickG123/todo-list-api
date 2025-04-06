import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../utils/create-and-authenticate-user";

describe("Create Todo (e2e)", () => {
    it("should create a todo when authenticated", async () => {
        const { token } = await createAndAuthenticateUser();

        const todo = await request(app.server)
            .post("/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Todo Test",
                description: "test"
            });

        expect(todo.statusCode).toBe(201);
        expect(todo.body).toEqual(
            expect.objectContaining({
                title: "Todo Test",
                description: "test"
            })
        );
    });
});
