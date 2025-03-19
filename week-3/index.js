const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Create Todo
app.post("/", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let newTodo = {
      id: req.body.id,
      todo: req.body.todo,
      description: req.body.description,
    };
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err, data) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

// Get todos
app.get("/", (req, res) => [
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  }),
]);

// Put todos
app.put("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let updatedTodo = req.body;
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    console.log(todos);
    todos.forEach((element, idx) => {
      if (element.id == id) {
        todos[idx] = {
          id: updatedTodo.id || element.id,
          todo: updatedTodo.todo || element.todo,
          description: updatedTodo.description || element.description,
        };
      }
    });
    fs.writeFile("todos.json", JSON.stringify(todos), (err, data) => {
      if (err) throw err;
      res.status(201).json(todo);
    });
  });
});

// get Todo By id
app.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let todo = todos.filter((e) => e.id == id);
    if (todo && todo.length > 0) return res.status(200).json(todo);
    return res.status(400).json({
      message: "No Todo Found",
    });
  });
});

// delete todo

app.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let todo = todos.filter((e) => parseInt(e.id) !== id);
    fs.writeFile("todos.json", JSON.stringify(todo), (err) => {
      if (err) throw err;
      res.status(200).json({
        message: "Todos deleted successfully",
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server Started");
});
