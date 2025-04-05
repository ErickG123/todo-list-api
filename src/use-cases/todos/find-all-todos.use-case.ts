import { Todo } from "@prisma/client";
import { TodosRepository } from "../../repositories/todos.repository";

interface FindAllTodosUseCaseRequestQuery {
    page?: number
    perPage?: number
}

interface FindAllTodosUseCaseResponse {
    todos: Todo[]
    total: number
    page: number
    perPage: number
}

export class FindAllTodosUseCase {
    constructor(private todosRepository: TodosRepository) { }

    async execute({
        page = 1, perPage = 10
    }: FindAllTodosUseCaseRequestQuery): Promise<FindAllTodosUseCaseResponse> {
        const { data, total } = await this.todosRepository.findAll(page, perPage);

        return {
            todos: data,
            total,
            page,
            perPage
        }
    }
}
