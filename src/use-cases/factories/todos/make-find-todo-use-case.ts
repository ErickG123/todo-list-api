import { PrismaTodosRepository } from "../../../repositories/prisma/prisma-todos.repository";
import { FindTodoUseCase } from "../../todos/find-todo.use-case";

export function makeFindTodoUseCase() {
    return new FindTodoUseCase(new PrismaTodosRepository);
}
