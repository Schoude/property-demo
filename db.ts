import { config, MongoClient } from "./deps.ts";

const client = new MongoClient();
await client.connect(config({ safe: true }).MONGO_URI as string);
const db = client.database("property");

export { db };
