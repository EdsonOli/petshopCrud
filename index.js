const { response, request } = require('express');
const express = require('express');
const petshop = require('./petshop')
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Rodando...")
});

app.get('/pets', (request, response) => {
    return response.send(petshop.listarpets())
})

app.post('/pets', (req, response) => {
    const pet = req.body
   
    petshop.adicionarNovopet(pet)
    console.log(pet)
    response.json(pet)

})