import { TodosRepository } from "../../repositories/todos.repository";

interface DeleteTodoUseCaseRequestParams {
    id: string
}

export class DeleteTodoUseCase {
    constructor(private todosRepository: TodosRepository) { }

    async execute({ id }: DeleteTodoUseCaseRequestParams): Promise<void> {
        this.todosRepository.delete(id);
    }
}
