const moment = require("moment");
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.js', 'utf-8');

let dataBase = JSON.parse(bancoDados);
const petshop = {
    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(dataBase)
        fs.writeFileSync('database.json', petsAtualizado, 'utf-8')
    },
    
    listarPets: () => {
        dataBase.pets.forEach(pet => exibirPet(pet))
    },
    
    buscarPorTipo: (tipo) => {
        let encontrados = []
        encontrados = dataBase.pets.filter(pet => pet.tipo === tipo)
        return encontrados
    },

    campanhaVacinacao: (lista) => {

        let contador = 0
        lista = lista.map((pet) => {
            if (!pet.vacinado){
                pet.vacinado = true
                contador++
            }
            return pet
        })
        console.log(`Pets vacinados: ${contador}`)
        atualizarBanco()    
     },

     darBanhoPet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY')
        pet.servicos.push({
            'nome': "Banho ",
            'data': dataHoje
        })
        console.log(`Serviço: Banho
         Data: ${dataHoje}`)
    },

    tosarPet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY')
        pet.servicos.push({
            'nome': "Tosa ",
            'data': dataHoje
        })
        console.log(`Serviço: Tosa
        Data: ${dataHoje}`)
    },
    
    apararUnhasPet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY')
        pet.servicos.push({
            'nome': "Aparou unhas ",
            'data': dataHoje
        })
        console.log(`Serviço: Aparou Unhas
        Data: ${dataHoje}`)
    },
    
    adicionarNovoPet: (nome, tipo, idade, raca, peso, tutor, vacinado) => {
        let pet = {
            nome: nome,
            tipo: tipo,
            idade: idade,
            raca: raca,
            peso: peso,
            tutor: tutor,
            vacinado: vacinado,
            servicos: []
        }
        dataBase.pets.push(pet)
        atualizarBanco()
    },
    
    atenderCliente: (pet, servico) => {
        console.log(`Bem vinde ao ${nomePetshop}, ${pet.nome}!`)
        servico(pet)
        atualizarBanco()
        console.log(`Tchau!`)
    },
    
    buscarPet: (nome) => {
        return dataBase.pets.find( pet => pet.nome === nome)
    }
       
}

module.exports = petshop;