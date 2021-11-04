const PORT = process.env.PORT || 42080
const express = require('express')

const { response } = require('express')

const app = express()

require("./routs/router")(app);

app.use(express.static('public'));



//app.get('/', (req, res) => {
//    res.json("Bem vindo ao website da cerveja")
//})
//
//
//app.get('/cerveja', async (req, res) => {
//    pegarPrecos()
//    .then(response => {
//        //console.log(lista);
//        res.json(lista); 
//    })
//})
//
//app.get('/cerveja/:marca', (req, res) => {
//
//    pegarPrecos()
//    .then(response => {
//        var marcaId = req.params.marca
//        marcaId = marcaId.toUpperCase()
//
//        res.json(lista.filter(item => item.marca.toUpperCase().includes(marcaId)))
//    })
// 
//})

app.listen(PORT, () => {
    console.log(`O servidor está a ouvir a porta ${PORT}`);
});


