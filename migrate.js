import { db } from "./db.js";

export async function setupTables() {
  db.serialize(() => {
    // create it if it doesn't exist
    db.run(
      "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT)"
    );
  });
}

async function seedData() {
  // check if there are already todos
  const rows = await new Promise((resolve, reject) => {
    db.all("SELECT COUNT(*) as count FROM todos", (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });

  if (rows[0].count > 0) {
    console.log("Todos already seeded");
    return;
  }
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
