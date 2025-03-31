import express, { Request, Response } from "express";
import { authenticateJwt } from "../middleware/index";
import { Todo } from "../db";
const router = express.Router();

// router.use(authenticateJwt)  ---> can use this without repeting it in controllers

router.post("/todos", authenticateJwt, (req: Request, res: Response) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.headers.id;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: "Failed to create a new todo" });
    });
});
router.get("/todos", authenticateJwt, (req: Request, res: Response) => {
  const userId = req.headers.id;

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: "Failed to retrieve todos" });
    });
});

router.patch(
  "/todos/:todoId/done",
  authenticateJwt,
  (req: Request, res: Response) => {
    const { todoId } = req.params;
    const userId = req.headers.id;

    Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { done: true },
      { new: true }
    )
      .then((updatedTodo) => {
        if (!updatedTodo) {
          return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
      })
      .catch((err: Error) => {
        res.status(500).json({ error: "Failed to update todo" });
      });
  }
);

export default router;
