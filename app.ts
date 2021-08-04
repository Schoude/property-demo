import { db } from "./db.ts";
import {
  Application,
  blue,
  green,
  oakCors,
  parse,
  Router,
  Status,
} from "./deps.ts";

const app = new Application();

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `${blue("Listening on:")} ${green(secure ? "https://" : "http://")}${
      green(
        hostname ?? "localhost",
      )
    }:${green(`${port}`)}`,
  );
});
const units = db.collection("units");

app.use(
  oakCors({
    origin: "*",
    methods: ["GET"],
  }),
);

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = {
    message: "Hello World!",
  };
  ctx.response.status = Status.OK;
});

router.get("/property", async (ctx) => {
  try {
    const unitsCursor = units.find({}, { noCursorTimeout: false });
    ctx.response.body = await unitsCursor.toArray();
    ctx.response.status = Status.OK;
  } catch (_) {
    ctx.response.status = Status.InternalServerError;
  }
});

router.get("/owwerchecker", (ctx) => {
  ctx.response.body = {
    owwerchecker: "https://youtu.be/KTK6y7lMAWE",
  };
  ctx.response.status = Status.OK;
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
