const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// About route
app.get('/about', (req, res) => {
  res.send('About Us: We are learning to build web servers!');
});

// API routes
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
});

// POST route
app.post('/api/data', (req, res) => {
  res.status(201).json({
    message: 'Data received successfully',
    data: req.body
  });
});

// Rute with URL parameters
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    user: { id: userId, name: `User ${userId}` }

  });
});

// Route with query parameters
app.get('/search', (req, res) => {
  const query = req.query.q || 'No search term provided';
  res.send(`Search results for: ${query}`);
});

// 404 handler - must be the last route

app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});
