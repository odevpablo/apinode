const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

const usuarioSchema = new mongoose.Schema({
  nome: String,
  senha: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

main().catch(err => console.log(err));


async function main() {
  try {
    await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Erro na conexão:'));
    db.once('open', () => {
      console.log('Conectado ao MongoDB!');
    });
  } catch (err) {
    console.error('Erro durante a conexão:', err);
  }

    app.post('/cadastro', async (req, res) => {
      try {
        const novoUsuario = req.body;
        const usuario = new Usuario(novoUsuario);
        await usuario.save();

        res.status(201).json({
          status: 'success',
          message: 'Cadastro realizado com sucesso!',
          data: novoUsuario,
        });
      } catch (err) {
        res.status(400).json({
          status: 'error',
          message: 'Erro ao cadastrar!',
          error: err.message,
        });
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }  
  
