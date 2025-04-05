import { Prisma, Todo } from "@prisma/client";

export interface TodosRepository {
    findById(id: string): Promise<Todo | null>
    findAll(page: number, perPage: number): Promise<{ data: Todo[], total: number }>
    create(data: Prisma.TodoCreateInput): Promise<Todo>
    update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo>
    delete(id: string): Promise<void>
}
