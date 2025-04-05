import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users.repository";
import { FindUserUserUseCase } from "../../users/find-user.use-case";

export function makeFindUserUseCase() {
    return new FindUserUserUseCase(new PrismaUsersRepository);
}
