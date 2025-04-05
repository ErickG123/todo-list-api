import { User } from "@prisma/client";
import { UsersRepositroy } from "../../repositories/users.repository";

interface FindAllUsersUseCaseResponse {
    users: User[]
}

export class FindAllUsersUseCase {
    constructor(private usersRepository: UsersRepositroy) { }

    async execute(): Promise<FindAllUsersUseCaseResponse> {
        const users = await this.usersRepository.findAll();

        return { users: users ?? [] };
    }
}
