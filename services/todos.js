import { db } from "../db.js";

export function getTodos() {
  return db.prepare("SELECT * FROM todos").all();
}

export function getTodoById(id) {
  return db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
}

export function addTodo(todo) {
  const stmt = db.prepare("INSERT INTO todos (text) VALUES (?)");
  const info = stmt.run(todo.text);
  return getTodoById(info.lastInsertRowid);
}

export function updateTodoById(id, todo) {
  const stmt = db.prepare("UPDATE todos SET text = ? WHERE id = ?");
  stmt.run(todo.text, id);
  return getTodoById(id);
}

export function deleteTodoById(id) {
  const todo = getTodoById(id);
  const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
  stmt.run(id);
  return todo;
}
