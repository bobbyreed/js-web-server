// routes-server.js

const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // Get the HTTP Method
  const method = req.method.toLowerCase();
  // Get the query string as an object
  const queryStringObject = parsedUrl.query;
  // Set a default header
  res.setHeader('Content-Type', 'text/plain');
  
  // Route handling
  if (trimmedPath === '') {
    // Home route

    res.writeHead(200);

    res.end('Welcome to the Home Page\n');

  } else if (trimmedPath === 'about') {

    // About route

    res.writeHead(200);

    res.end('About Us: We are learning to build web servers!\n');

  } else if (trimmedPath === 'api/users' && method === 'get') {

    // API route - users

    res.setHeader('Content-Type', 'application/json');

    res.writeHead(200);

    res.end(JSON.stringify({

      users: [

        { id: 1, name: 'Reed' },

        { id: 2, name: 'Maxwell' }

      ]

    }));

  } else {

    // Not found route

    res.writeHead(404);

    res.end('404 - Not Found\n');

  }

});

server.listen(3001, () => {

  console.log('Server running at http://localhost:3001/');

});
