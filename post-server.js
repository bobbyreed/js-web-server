const http= require('http');
const url = require('url');
const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
    const method = req.method.toLowerCase();

    console.log('Method:', method);
    console.log('Path:', path);
    console.log('Trimmed Path:', trimmedPath);

    //POST data handling
    if(method === 'post' && trimmedPath === 'api/data'){
        let body = [];

        //collect data chunks
        req.on('data', (chunk) => {

            body.push(chunk);
      
          });

        //process complete body request
        req.on('end', () => {
            body = Buffer.concat(body).toString();

            //If thebody is json, parse it
            let parsedBody;
            try{
                parsedBody= JSON.parse(body);

                //Set response
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(201); //201 = Created
                res.end(JSON.stringify({
                    message: 'Data received successfully',
                    data: parsedBody
                }));
            } catch(e){
                //Handle invalid JSON
                res.writeHead(400); //400 = Bad request
                res.end('Invalid JSON payload\n');
            }
        });
    } else {
        //Handle other routes
        res.setHeader('Content-Type', 'text/plain');

        if(trimmedPath ===''){
            res.writeHead(200); //200 = OK
            res.end('Welcome to the Home Page\n')
        }
        else if (trimmedPath === 'about'){
            res.writeHead(200);
            res.end('About Us: We be cool\n');

        } else {
            res.writeHead(404);
            res.end('404 - Not Found\n');
        }
    }
});

server.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});