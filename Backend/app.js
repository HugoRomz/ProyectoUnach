const express = require('express');
const cors = require('cors');
const path = require('path'); 
const app = express();
const authRoutes = require('./routes/authRoutes')
const tutoriasRoutes = require('./routes/TutoriasRoutes');
const ensenanzaRoutes = require('./routes/EnsenanzaRoutes');
const investigacionRoutes = require("./routes/InvestigacionRoutes");

app.use(express.json());
app.use(cors());



app.use('/public', express.static(path.join(__dirname, 'public'))); 

const puerto = process.env.PUERTO || 3000;

app.use('/auth', authRoutes);
app.use('/tutorias', tutoriasRoutes);
app.use('/ensenanza', ensenanzaRoutes);
app.use('/investigacion', investigacionRoutes);

app.listen(puerto, () => {
    console.log(`Servidor OK en: http://localhost:${puerto}`);
});
