import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateTodoUseCase } from "../../../use-cases/factories/todos/make-update-todo-use-case";
import { TodoNotFound } from "../../../use-cases/errors/todo-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

const bodySchema = z.object({
    title: z.string(),
    description: z.string()
});

export async function updateTodoController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);
    const body = bodySchema.parse(request.body);

    const updateTodoUseCase = makeUpdateTodoUseCase();

    try {
        const { todo } = await updateTodoUseCase.execute(params, body);

        return reply.status(200).send(todo);
    } catch (error) {
        if (error instanceof TodoNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
