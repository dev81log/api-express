const express = require('express');
const mongoose = require('mongoose');
const routes = require('./api/routes');

const app = express();

const uri = 'mongodb://localhost:27017/users';

mongoose
  .connect(uri)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

module.exports = app;
