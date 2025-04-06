import { beforeAll, afterAll, beforeEach } from "vitest"
import { app } from "../app"
import { execSync } from "node:child_process"

beforeAll(async () => {
    await app.ready();
});

afterAll(async () => {
    await app.close();
});

beforeEach(() => {
    execSync("npx prisma migrate reset --force");
});
