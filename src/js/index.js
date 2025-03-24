const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', '..', 'FRONT-END-HELPNEI', 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'FRONT-END-HELPNEI', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
