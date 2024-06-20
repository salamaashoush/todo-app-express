import { db } from "./db.js";

export async function setupTables() {
  // using better-sqlite3
  db.prepare(
    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT)"
  ).run();
}

async function seedData() {
  // using better-sqlite3

  // check if there are already todos
  const rows = db.prepare("SELECT COUNT(*) as count FROM todos").get();
  if (rows.count > 0) {
    console.log("Todos already exist, skipping seed data");
    return;
  }
  // seed data
  const stmt = db.prepare("INSERT INTO todos (text) VALUES (?)");
  stmt.run("Buy groceries");
  stmt.run("Walk the dog");
  stmt.run("Wash the car");
  console.log("Seed data complete");
}

setupTables()
  .then(seedData)
  .then(() => {
    console.log("Database setup complete");
  })
  .catch((err) => {
    console.error(err);
  });
