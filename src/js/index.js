const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Aqui será a pagina do projeto');
});

app.listen(port, () => {
  console.log(`O link do projeto: http://localhost:${port}`);
});