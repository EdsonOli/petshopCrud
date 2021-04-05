const moment = require("moment");
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

let dataBase = JSON.parse(bancoDados);
const petshop = {
    atualizarBanco: () => {
        let petsAtualizado = JSON.stringify(dataBase)
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8')
    },

    listarpets: () => {
        let textoListapets = "petSHOP \n";
        dataBase.pets.forEach((pet) => {
            textoListapets += (`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado' : 'não vacinado'}\n`);
            pet.servicos.forEach((servico) => {
                textoListapets += (`${servico.data} - ${servico.nome}\n`);
            })
        })

        return textoListapets
    },

    buscarPorTipo: (tipo) => {
        let encontrados = []
        encontrados = dataBase.pets.filter(pet => pet.tipo === tipo)
        return encontrados
    },

    campanhaVacinacao: (lista) => {

        let contador = 0
        lista = lista.map((pet) => {
            if (!pet.vacinado) {
                pet.vacinado = true
                contador++
            }
            return pet
        })
        console.log(`pets vacinados: ${contador}`)
        atualizarBanco()
    },

    darBanhopet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY')
        pet.servicos.push({
            'nome': "Banho ",
            'data': dataHoje
        })
        console.log(`Serviço: Banho
         Data: ${dataHoje}`)
    },

    tosarpet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY')
        pet.servicos.push({
            'nome': "Tosa ",
            'data': dataHoje
        })
        console.log(`Serviço: Tosa
        Data: ${dataHoje}`)
    },

    apararUnhaspet: (pet) => {
        let dataHoje = moment().format('DD-MM-YYYY')
        pet.servicos.push({
            'nome': "Aparou unhas ",
            'data': dataHoje
        })
        console.log(`Serviço: Aparou Unhas
        Data: ${dataHoje}`)
    },

    adicionarNovopet: (pet) => {
        dataBase.pets.push(pet)
        petshop.atualizarBanco()
    },

    atenderCliente: (pet, servico) => {
        console.log(`Bem vinde ao ${nomepetshop}, ${pet.nome}!`)
        servico(pet)
        atualizarBanco()
        console.log(`Tchau!`)
    },

    buscarpet: (nome) => {
        return dataBase.pets.find(pet => pet.nome === nome)
    },

    clientePremium: (pet) => {
        // let nome = pet.nome;
        let { nome } = pet;

        let nServicos = pet.servicos.length;

        if (nServicos > 5) {
            console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
        }
    },
    contatoTutor: (pet) => {
        let { nome, tutor, contato } = pet;

        return `Tutor: ${tutor}
        Contato: ${contato}
        pet: ${nome}`;
    },
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });

        console.log(`pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        })
    }

}

module.exports = petshop;