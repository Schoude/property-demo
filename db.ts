import { MongoClient } from "./deps.ts";

const client = new MongoClient();
console.log(Deno.env.get("MONGO_URI"));
await client.connect(Deno.env.get("MONGO_URI") as string);
const db = client.database("property");

export { db };
