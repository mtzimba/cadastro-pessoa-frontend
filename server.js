const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// Configura o middleware para servir os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura o roteamento para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor na porta 3001
app.listen(port, () => {
  console.log(`Frontend rodando em http://localhost:${port}`);
});