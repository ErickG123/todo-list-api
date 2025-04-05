import { UsersRepository } from "../../repositories/users.repository";
import { UserNotFound } from "../errors/user-not-found.error";

interface DeleteUserUseCaseRequestParams {
    id: string
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ id }: DeleteUserUseCaseRequestParams): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) throw new UserNotFound();

        await this.usersRepository.delete(id);
    }
}
