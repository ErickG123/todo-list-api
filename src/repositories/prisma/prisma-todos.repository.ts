import { Prisma, Todo } from "@prisma/client";
import { TodosRepository } from "../todos.repository";
import { prisma } from "../../lib/prisma";

export class PrismaTodosRepository implements TodosRepository {
    async findById(id: string): Promise<Todo | null> {
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        return todo;
    }

    async findAll(page: number = 1, perPage: number = 10): Promise<{ data: Todo[], total: number }> {
        const [data, total] = await Promise.all([
            prisma.todo.findMany({
                skip: (page - 1) * perPage,
                take: perPage
            }),
            prisma.todo.count()
        ]);

        return { data, total };
    }

    async create(data: Prisma.TodoCreateInput): Promise<Todo> {
        try {
            const todo = await prisma.todo.create({ data });

            return todo;
        } catch (error) {
            console.error("Error Creating Todo: ", error);
            throw error;
        }
    }

    async update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo> {
        try {
            const todo = await prisma.todo.update({
                where: {
                    id
                },
                data
            });

            return todo;
        } catch (error) {
            console.error("Error Updating Todo: ", error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        await prisma.todo.delete({
            where: {
                id
            }
        });
    }
}
