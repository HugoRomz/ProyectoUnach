const express = require('express');
const cors = require('cors');
const path = require('path'); 
const dotenv = require('dotenv');  // <- Importación de dotenv
const app = express();
const authRoutes = require('./routes/authRoutes');
const tutoriasRoutes = require('./routes/TutoriasRoutes');
const ensenanzaRoutes = require('./routes/EnsenanzaRoutes');
const investigacionRoutes = require('./routes/InvestigacionRoutes');
const secretariaRoutes =  require('./routes/secretariaRoutes')

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public'))); 

app.use('/auth', authRoutes);
app.use('/tutorias', tutoriasRoutes);
app.use('/ensenanza', ensenanzaRoutes);
app.use('/investigacion', investigacionRoutes);
app.use('/secretaria', secretariaRoutes);

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Servidor OK en: http://localhost:${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`El puerto ${port} está ocupado. Probando con el puerto ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Error al iniciar el servidor:', err);
        }
    });
}

const defaultPort = process.env.PUERTO || 3000;

app.get('/config', (req, res) => {
    res.json({ serverPort: defaultPort });
});

startServer(defaultPort);