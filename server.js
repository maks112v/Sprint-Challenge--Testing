const express = require("express");

const server = express();

server.use(express.json());

let games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  },
  {
    title: "Pac",
    genre: "Arcade",
    releaseYear: 1981
  }
];

server.get('/', (req, res) => {
  res.status(200).json(games)
})

server.post('/', (req, res) => {
  const data = req.body
  if(data.title && data.genre){
    if(!games.includes(data.title)){
      games.push(data)
      res.status(201).json(games.length)
    }
    else {
      res.status(405).json({message: 'duplicate'})
    }
  }
  else{
    res.status(422).json({message: 'no data'})
  }
  
})


module.exports = server;