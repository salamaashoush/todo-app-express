import express from "express";
import {
  getTodos,
  getTodoById,
  addTodo,
  updateTodoById,
  deleteTodoById,
} from "../services/todos.js";

export default function setup(app) {
  const router = express.Router();
  // GET /todos
  router.get("/", async (req, res) => {
    const todos = await getTodos();
    res.json(todos);
  });

  // GET :id
  router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const todo = await getTodoById(id);
    if (!todo) {
      res.status(404).json({
        message: "Todo not found",
      });
      return;
    }
    res.json(todo);
  });

  // POST /todos
  router.post("/", async (req, res) => {
    const todo = req.body;
    const id = addTodo(todo);
    res.json({
      message: "Todo added",
      id,
    });
  });

  // PUT :id
  router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const todo = req.body;
    await updateTodoById(id, todo);
    res.json({
      message: "Todo updated",
    });
  });

  // DELETE :id
  router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteTodoById(id);
    res.json({
      message: "Todo deleted",
    });
  });

  app.use("/todos", router);
}
