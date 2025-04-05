import { PrismaTodosRepository } from "../../../repositories/prisma/prisma-todos.repository";
import { FindAllTodosUseCase } from "../../todos/find-all-todos.use-case";

export function makeFindAllTodosUseCase() {
    return new FindAllTodosUseCase(new PrismaTodosRepository);
}
