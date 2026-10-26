import express from 'express';

const app = express();
const PORT = 3000;

// Crucial Middleware: Automatically parses incoming 'application/json' request bodies
app.use(express.json());

// Initialize Mock Datastore Array
let tasks = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Master Express Routing', completed: true }
];

// Base check endpoint to test the website root
app.get('/', (req, res) => {
  res.json({ message: "Task Management API is active and online!" });
});

// 1. GET ALL TASKS
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// 2. POST A NEW TASK
app.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;

  // Simple validation check
  if (!title || completed === undefined) {
    return res.status(400).json({ error: "Missing required fields: title and completed" });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    completed: Boolean(completed)
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. DELETE A TASK BY UNIQUE ID
app.delete('/api/tasks/:id', (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const initialLength = tasks.length;
  
  tasks = tasks.filter(task => task.id !== targetId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: `Task with ID ${targetId} not found.` });
  }

  res.status(200).json({ message: `Task ${targetId} successfully removed.` });
});

// START THE SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server actively listening on network port: ${PORT}`);
});