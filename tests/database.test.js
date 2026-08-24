require("dotenv").config();

const test = require("node:test");
const assert = require("node:assert");
const { MongoClient } = require("mongodb");
const dns = require("dns");

test("MongoDB connection works", async () => {
  const mongoUri = process.env.MONGODB_URI;
  assert.ok(mongoUri, "MONGODB_URI is not defined");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db("cicd_learning");
    const result = await db.command({
      ping: 1,
    });
    assert.strictEqual(result.ok, 1);
  } finally {
    await client.close();
  }
});
