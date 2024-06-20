import express from "express";

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

import todos from "./controllers/todos.js";
import { getTodos } from "./services/todos.js";

// GET /
app.get("/", async (req, res) => {
  const todos = await getTodos();
  res.render("index", {
    todos,
  });
});

// controllers
todos(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
