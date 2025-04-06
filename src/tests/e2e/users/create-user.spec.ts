import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Create User (e2e)", () => {
    it("should create a user", async () => {
        const response = await request(app.server)
            .post("/users")
            .send({
                name: "Erick",
                email: "erick@test.com",
                password: "12345678",
            });

        expect(response.statusCode).toBe(201);
    });
});
