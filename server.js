const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || '8080';
const router = require('./controllers/articles_controller');

//express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve static files
app.use(express.static('public'))
//routes
app.use(router)

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsboard";

mongoose.connect(MONGODB_URI);

//socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => { 
  console.log('user connected...')
  socket.on('message', msg => {
    io.emit('message', msg );
  })
});

server.listen(PORT, () => console.log("server is running at " + PORT));