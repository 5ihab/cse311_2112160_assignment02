const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    fs.readFile('login form.html', (err, data) => {
        res.write(data);
        res.end();
    })
});
server.listen(3000, 'localhost', ()=> {})