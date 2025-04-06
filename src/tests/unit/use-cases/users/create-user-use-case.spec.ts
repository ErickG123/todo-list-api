import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "../../../../use-cases/users/create-user.use-case";

describe("Create User Use Case", () => {
    it("should create a user", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const createUserUseCase = new CreateUserUseCase(usersRepository);

        const { user } = await createUserUseCase.execute({
            name: "Erick",
            email: "erickgabrielalves0@gmail.com",
            password: "12345678"
        });

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Erick");
    });
});
