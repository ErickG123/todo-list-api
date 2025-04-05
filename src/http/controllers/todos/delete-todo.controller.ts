import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteTodoUseCase } from "../../../use-cases/factories/todos/make-delete-todo-use-case";
import { TodoNotFound } from "../../../use-cases/errors/todo-not-found.error";

const paramsSchema = z.object({
    id: z.string().uuid()
});

export async function deleteTodoController(request: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.parse(request.params);

    const deleteTodoUseCase = makeDeleteTodoUseCase();

    try {
        await deleteTodoUseCase.execute(params);

        return reply.status(204).send({ message: "Todo deleted." });
    } catch (error) {
        if (error instanceof TodoNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
