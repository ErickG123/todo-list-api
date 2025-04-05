import { PrismaTodosRepository } from "../../../repositories/prisma/prisma-todos.repository";
import { UpdateTodoUseCase } from "../../todos/update-todo.use-case";

export function makeUpdateTodoUseCase() {
    return new UpdateTodoUseCase(new PrismaTodosRepository);
}
