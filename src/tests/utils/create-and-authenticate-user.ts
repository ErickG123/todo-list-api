import request from "supertest";
import { app } from "../../app";

export async function createAndAuthenticateUser() {
    await request(app.server).post("/users").send({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
    });

    const authResponse = await request(app.server)
        .post("/users/authenticate")
        .send({
            email: "test@example.com",
            password: "123456",
        });

    const { token } = authResponse.body;

    return { token };
}
