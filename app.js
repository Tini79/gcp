const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const src = path.join(__dirname, "views");
var server = require('server-js');

app.use(express.static(src));

let projectId = 'persuasive-byte-275007'
let keyFilename = 'persuasive-byte.json'
const storage = new Storage({
    projectId,
    keyFilename
})
const bucket = storage.bucket('port-new-bucket')

app.get('/assets', async (req, res) =>{
    const [files] = await bucket.getFiles();

    res.send([files])
});

app.get("/", (req, res) => {
    res.sendFile(src + "/index.html");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

server.static(__dirname)

server.get('/', function(req, res) {
    res.end('get /')
});