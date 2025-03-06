const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    //Parse the request
    const parsedUrl = url.parse((req, res) => {
    const path = parsedUrl.pathname;
    /*
        trimmedPath explained
        .replace() is a JavaScript string method that replaces parts of a string
        /^\/+|\/+$/g is a regular expression that looks for:

        ^\/+ - One or more forward slashes (/) at the beginning of the string
        | - OR
        \/+$ - One or more forward slashes at the end of the string


        g is a flag that means "global" - find all matches, not just the first
        The second parameter '' (empty string) is what those matches will be replaced with

        For example:

        If path is "/users/", trimmedPath becomes "users"
        If path is "///api/products////", trimmedPath becomes "api/products"
        If path is "products", it stays as "products"
    */
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the HTTP Method
    const method = req.method.toLowerCase();

    //Get the query string as a JS object - Why do we need this to be an object?
    const queryStringObject = parsedUrl.query;

    //Set a default header
    res.setHeader('Content-Type', 'text/plain');

    //Route handling
    if(trimmedPath === ''){
        //Home route
        res.writeHead(200);
        res.end('Welcome to the Home Page\n');
    }
    else if(trimmedPath === 'about'){
        //About route
        res.writeHead(200);
        res.end('About Us: We are learning to build web servers!\n');
    }
    else if(trimmedPath === 'api/users' && method === 'get'){
        //API route - users
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(JSON.stringify({
            users: [
                {id: 1, name: 'Maxwell'},
                {id: 2, name: 'Reed'},
            ]
        }));
    } else {
        //Not found route
        res.writeHead(404);
        res.end('404 - Not Found\n');
    }
    });
    server.listen(3001, () => {
        console.log("Server running at http://localhost:3001/");
    });