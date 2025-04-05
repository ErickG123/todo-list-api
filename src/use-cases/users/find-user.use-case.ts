import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users.repository";
import { UserNotFound } from "../errors/user-not-found.error";

interface FindUserUserUseCaseRequestParams {
    id: string
}

interface FindUserUserUseCaseResponse {
    user: User
}

export class FindUserUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ id }: FindUserUserUseCaseRequestParams): Promise<FindUserUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id);

        if (!user) throw new UserNotFound();

        return { user };
    }
}
