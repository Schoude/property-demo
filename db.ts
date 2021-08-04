import { config, MongoClient } from "./deps.ts";

const client = new MongoClient();
await client.connect(config().MONGO_URI);
const db = client.database("property");

export { db };
