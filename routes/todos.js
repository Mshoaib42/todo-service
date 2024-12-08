import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Create a new to-do
router.post("/", async (req, res) => {
  const { userId, title, description } = req.body;

  try {
    const todo = new Todo({
      userId,
      title,
      description,
    });

    const createdTodo = await todo.save();
    res.status(201).json(createdTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get all to-dos for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update a to-do
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "To-Do not found" });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Delete a to-do
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "To-Do not found" });
    }
    res.json({ message: "To-Do deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
