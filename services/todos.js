import { db } from "../db.js";

export function getTodos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM todos", (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

export function getTodoById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM todos WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

export function addTodo(todo) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO todos (text) VALUES (?)", [todo.text], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
}

export function updateTodoById(id, todo) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE todos SET text = ? WHERE id = ?",
      [todo.text, id],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
}

export function deleteTodoById(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
