import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "../../../use-cases/factories/users/make-create-user-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists.error";
import { generateAndSetTokens } from "../../utils/generate-and-set-token";

const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
    const body = bodySchema.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase();

    try {
        const { user } = await createUserUseCase.execute(body);

        const accessToken = await generateAndSetTokens({
            reply,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

        return reply.status(201).send({ token: accessToken });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(400).send({ message: error.message });
        }

        return reply.status(400).send(error);
    }
}
