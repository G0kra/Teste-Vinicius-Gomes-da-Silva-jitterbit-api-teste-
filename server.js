const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

// Conexão com o banco (Certifique-se que o MongoDB está rodando no seu Mac)
mongoose.connect('mongodb://127.0.0.1:27017/jitterbit_db')
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro no MongoDB:', err));

// Usando as rotas
app.use('/order', orderRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando: http://localhost:3000');
});