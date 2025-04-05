import { PrismaTodosRepository } from "../../../repositories/prisma/prisma-todos.repository";
import { DeleteTodoUseCase } from "../../todos/delete-todo.use-case";

export function makeDeleteTodoUseCase() {
    return new DeleteTodoUseCase(new PrismaTodosRepository);
}
