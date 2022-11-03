const express = require('express');
const characterMiddleware = require('./middlewares/character.js');
const abilityMiddleware = require('./middlewares/ability.js');

const server = express();
//middelwares
server.use(express.json());

server.use('/character', characterMiddleware);
server.use('/ability', abilityMiddleware);

server.get('/', (req, res) => {
  res.send('Henry Sequelize Homework');
});

//npm run dev para correr el servidor
module.exports = server;