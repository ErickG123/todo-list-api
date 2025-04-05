import { Todo } from "@prisma/client"
import { TodosRepository } from "../../repositories/todos.repository"
import { TodoNotFound } from "../errors/todo-not-found.error";

interface FindTodoUseCaseRequestParams {
    id: string
}

interface FindTodoUseCaseResponse {
    todo: Todo
}

export class FindTodoUseCase {
    constructor(private todosRepository: TodosRepository) { }

    async execute({ id }: FindTodoUseCaseRequestParams): Promise<FindTodoUseCaseResponse> {
        const todo = await this.todosRepository.findById(id);

        if (!todo) throw new TodoNotFound();

        return { todo };
    }
}
