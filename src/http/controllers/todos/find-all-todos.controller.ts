import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindAllTodosUseCase } from "../../../use-cases/factories/todos/make-find-all-todos-use-case";
import { z } from "zod";

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(10).default(10)
});

export async function findAllTodosController(request: FastifyRequest, reply: FastifyReply) {
    const query = querySchema.parse(request.query);

    const findAllTodosUseCase = makeFindAllTodosUseCase();

    try {
        const { todos, total, page, perPage } = await findAllTodosUseCase.execute(query);

        return reply.status(200).send({
            todos,
            meta: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage)
            }
        });
    } catch (error) {
        return reply.status(400).send(error);
    }
}
