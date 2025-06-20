const express = require('express');
const clienteRoutes = require('./routes/cliente.routes');
const mongoose = require('mongoose');
const cors = require('cors');
const freteRoutes = require('./routes/frete.routes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/clientes', clienteRoutes);
app.use('/api/frete', freteRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Rota teste
app.get('/', (req, res) => {
    res.send('API funcionando 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
