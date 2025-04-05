import { Todo } from "@prisma/client"
import { TodosRepository } from "../../repositories/todos.repository"

interface UpdateTodoUseCaseRequestParams {
    id: string
}

interface UpdateTodoUseCaseRequest {
    title: string
    description: string
}

interface UpdateTodoUseCaseResponse {
    todo: Todo
}

export class UpdateTodoUseCase {
    constructor(private todosRepository: TodosRepository) { }

    async execute(
        { id }: UpdateTodoUseCaseRequestParams,
        { title, description }: UpdateTodoUseCaseRequest
    ): Promise<UpdateTodoUseCaseResponse> {
        const todo = await this.todosRepository.update(
            id,
            {
                title,
                description
            }
        );

        return { todo };
    }
}
