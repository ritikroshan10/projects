const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Create Schema
const todoSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// ✅ Create Model
const ToDo = mongoose.model('ToDo', todoSchema);

// ✅ Routes

// Get all ToDos
app.get('/todos', async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a new ToDo
app.post('/todos', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newTodo = new ToDo({ name });
    const savedTodo = await newTodo.save();
    res.json(savedTodo); // Send back saved document
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// Delete a ToDo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await ToDo.findByIdAndDelete(id);
    res.json({ message: 'ToDo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
