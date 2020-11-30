
const express = require('express');

const server = express();
// for parsing application/json
server.use(express.json());
// for parsing application/xwww-
server.use(express.urlencoded({ extended: true })); 
//form-urlencoded
//routes
server.use('/', require('./routes/main'));
server.use(express.static('ui'));
//handles 404 errors
server.use(function (req, res) {
    res.sendStatus(404);
})

const PORT = process.argv[2] || 8000;
server.listen(PORT, console.log(`Server started on port ${PORT}`));