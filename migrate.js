import { db } from "./db";

export async function setupTables() {
  db.serialize(() => {
    // create it if it doesn't exist
    db.run(
      "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT)"
    );
  });
}

async function seedData() {
  const stmt = db.prepare("INSERT INTO todos (text) VALUES (?)");
  for (let i = 0; i < 10; i++) {
    stmt.run(`Todo ${i}`);
    console.log(`Inserted Todo ${i}`);
  }
  stmt.finalize();
}

setupTables()
  .then(seedData)
  .then(() => {
    console.log("Database setup complete");
  })
  .catch((err) => {
    console.error(err);
  });
