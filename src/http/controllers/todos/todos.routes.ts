import { FastifyInstance } from "fastify";
import { createTodoController } from "./create-todo.controller";
import { updateTodoController } from "./update-todo.controller";
import { deleteTodoController } from "./delete-todo.controller";
import { findAllTodosController } from "./find-all-todos.controller";
import { findTodoController } from "./find-todo.controller";

export async function todosRoutes(app: FastifyInstance) {
    app.get("/todos", { preHandler: [app.authenticate] }, findAllTodosController);
    app.get("/todos/:id", { preHandler: [app.authenticate] }, findTodoController);
    app.post("/todos", { preHandler: [app.authenticate] }, createTodoController);
    app.put("/todos/:id", { preHandler: [app.authenticate] }, updateTodoController);
    app.delete("/todos/:id", { preHandler: [app.authenticate] }, deleteTodoController);
}
