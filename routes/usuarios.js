const express = require ('express');
const fs = require('fs');

const usuarios = express.Router();

usuarios.route('/')
.get((req, res) => {

    const db = lerBancoDados();  //retorna o banco de dados

    res.status(200).json(db)
})
.post((req, res) => {


    const {matricula, nome, media} = req.body;

    if (!matricula || !nome || !media) {
        res.status(400).json({mensagem: "Por favor, preencha todos os campos."});
        return;
    } 

    const db = lerBancoDados();

    const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)

    if (alunoEncontrado){
        res.status(400).json({mensagem:"usuário já existe!"});
        return;
    }

    const novoUsuario = {
        matricula,
        nome,
        media
    }

    db.push(novoUsuario)

    gravarBancoDados(db);

    res.status(200).json({mensagem:"Novo usuario criado com sucesso!"})

})


.put((req, res) => {
    res.json({mensagem: "PUT realizado com sucesso"})
})


.delete((req, res) => {

    const {matricula, nome, media} = req.body;

    if (!matricula || !nome || !media) {
        res.status(400).json ({mensagem:"Por favor, preencha todos os campos!"})
        return;
    }   

    const db = lerBancoDados();

    const alunoEncontrado = db.find(aluno => aluno.matricula === matricula);

    if (!alunoEncontrado){
        res.status(404).json({mensagem:"aluno inexistente."})
        return;
    }

    const dbAtualizado = db.filter(aluno => aluno.matricula !== matricula)

    gravarBancoDados(dbAtualizado);

    res.status(200).json({mensagem:"Usuário deletado com sucesso!"})
});

function lerBancoDados(){
    const arquivo = fs.readFileSync('./db/db.json');
    const db = JSON.parse(arquivo);
    return db;
}

function gravarBancoDados(db){
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2));
}

module.exports = usuarios;