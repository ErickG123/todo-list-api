import { PrismaTodosRepository } from "../../../repositories/prisma/prisma-todos.repository";
import { CreateTodoUseCase } from "../../todos/create-todo.use-case";

export function makeCreateTodoUseCase() {
    return new CreateTodoUseCase(new PrismaTodosRepository);
}
