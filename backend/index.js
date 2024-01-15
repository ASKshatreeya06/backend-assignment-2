const express = require('express');
const app = express();
const storage = require('node-persist');
const cors = require('cors');

app.use(cors());
app.use(express.json());

async function startServer() {
  await storage.init();

  // Clear the storage when the server starts
  await storage.clear();

  app.get('/task', async (req, res) => {
    res.send(await storage.keys());
  });

  app.post('/task', async (req, res) => {
    const { task } = req.body;
    await storage.setItem(task);
    res.send('Added task successfully!');
  });

  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
