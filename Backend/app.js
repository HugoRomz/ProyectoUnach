const express = require('express');
const cors = require('cors');
const app = express();
const articuloRoutes = require('./routes/articuloRoutes');

app.use(express.json());
app.use(cors());

const puerto = process.env.PUERTO || 3000;

app.use('/', articuloRoutes);

app.listen(puerto, () => {
    console.log(`Servidor OK en: http://localhost:${puerto}`);
});
