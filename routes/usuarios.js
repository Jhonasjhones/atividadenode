const express = require ('express');
const fs = require('fs');

const usuarios = express.Router();

usuarios.route('/')
.get((req, res) => {

    const db = lerBancoDados();  //retorna o banco de dados

    res.status(200).json(db)
})
.post((req, res) => {
    

    res.json({mensagem: "POST realizado com sucesso"})


})


.put((req, res) => {
    res.json({mensagem: "PUT realizado com sucesso"})
})


.delete((req, res) => {
    res.json({mensagem: "DELETE realizado com sucesso"})
});

function lerBancoDados(){
    const arquivo = fs.readFileSync('./db/db.json');
    const db = JSON.parse(arquivo);
    return db;
}

function gravarBancoDados(db){
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
}

module.exports = usuarios;