const express = require('express');
const cors = require('cors');
const path = require('path'); 
const app = express();
const articuloRoutes = require('./routes/articuloRoutes');
const ensenanzaRoutes = require('./routes/EnsenanzaRoutes');

app.use(express.json());
app.use(cors());



app.use('/public', express.static(path.join(__dirname, 'public'))); 

const puerto = process.env.PUERTO || 3000;

app.use('/', articuloRoutes);
app.use('/ensenanza', ensenanzaRoutes);

app.listen(puerto, () => {
    console.log(`Servidor OK en: http://localhost:${puerto}`);
});
