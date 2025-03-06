const http = require('http');

const server = http.createServer((req, res) => {
    //set response header
    res.writeHead(200, {'Content-Type': 'text/plain'});

    //write a response to the client
    res.end(`Hello World! This is my first server.`);
});

//Server listens on port 3001
server.listen(3001, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3001/');
});

