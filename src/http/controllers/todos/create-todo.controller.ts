import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateTodoUseCase } from "../../../use-cases/factories/todos/make-create-todo-use-case";

const bodySchema = z.object({
    title: z.string(),
    description: z.string()
});

export async function createTodoController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body);

    const createTodoUseCase = makeCreateTodoUseCase();

    try {
        const { todo } = await createTodoUseCase.execute(body);

        return reply.status(201).send(todo);
    } catch (error) {
        return reply.status(400).send(error);
    }
}
