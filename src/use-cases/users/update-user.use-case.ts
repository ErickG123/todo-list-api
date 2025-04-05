import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users.repository";
import { hash } from "bcrypt";
import { UserNotFound } from "../errors/user-not-found.error";

interface UpdateUserUseCaseRequestParams {
    id: string
}

interface UpdateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(
        { id }: UpdateUserUseCaseRequestParams,
        { name, email, password }: UpdateUserUseCaseRequest
    ): Promise<UpdateUserUseCaseResponse> {
        const userExists = await this.usersRepository.findById(id);

        if (!userExists) throw new UserNotFound();

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.update(
            id,
            {
                name,
                email,
                password: passwordHash
            }
        )

        return { user };
    }
}
