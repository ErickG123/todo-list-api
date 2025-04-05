import { Todo } from "@prisma/client";
import { TodosRepository } from "../../repositories/todos.repository";

interface CreateTodoUseCaseRequest {
    title: string
    description: string
}

interface CreateTodoUseCaseResponse {
    todo: Todo
}

export class CreateTodoUseCase {
    constructor(private todosRepository: TodosRepository) {}

    async execute({
        title, description
    }: CreateTodoUseCaseRequest): Promise<CreateTodoUseCaseResponse> {
        const todo = await this.todosRepository.create({
            title,
            description
        });

        return { todo };
    }
}
