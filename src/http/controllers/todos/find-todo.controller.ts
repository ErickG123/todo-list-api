import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindTodoUseCase } from "../../../use-cases/factories/todos/make-find-todo-use-case";
import { TodoNotFound } from "../../../use-cases/errors/todo-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function findTodoController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const findTodoUseCase = makeFindTodoUseCase();

    try {
        const { todo } = await findTodoUseCase.execute(params);

        return reply.status(200).send(todo);
    } catch (error) {
        if (error instanceof TodoNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
