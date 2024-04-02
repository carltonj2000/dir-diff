import { Elysia } from "elysia";
import { waitSome } from "./dir";
import cors from "@elysiajs/cors";
import { Stream } from "@elysiajs/stream";
import { Glob } from "bun";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get("/version", () => ({ version: 2 }))
  .get("/waitSome", async () => {
    await waitSome(1000);
    return { more: "json" };
  })
  .get(
    "/source",
    () =>
      new Stream((stream) => {
        const interval = setInterval(() => {
          stream.send({ hello: "world" });
        }, 500);

        setTimeout(() => {
          clearInterval(interval);
          stream.close();
        }, 3000);
      })
  )
  .get("/files", async () => {
    const glob = new Glob("**/*");
    const files = [];
    for await (const file of glob.scan({
      cwd: "/renderws/carltonData/cj2024/code/monorepo/dir-diff/waku-client1/src",
    })) {
      files.push(file);
    }
    return files;
  })
  .onError((error) => {
    if (error.code === "NOT_FOUND") return "Route not found :(";
    console.error({ error });
  })
  .listen(3333);

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);
