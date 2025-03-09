const express = require('express');
const app = express();
const port = 3001;

// Serve files from the 'public' folder
app.use(express.static('public'));

app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// About route
app.get('/about', (req, res) => {
  res.send('About Us: We are learning to build web servers!');
});

// API routess
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 0, name: 'Tashfeen' },
      { id: 1, name: 'Reed' },
      { id: 2, name: 'Maxwell' },
      { id: 3, name: 'Anga' }
    ]
  });
});

// POST routes
app.post('/api/data', (req, res) => {
  res.status(201).json({
    message: 'Data received successfully',
    data: req.body
  });
});

//GET routes
app.get('/api/products', (req, res) => {
  res.status(200).json({

  })
})

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
