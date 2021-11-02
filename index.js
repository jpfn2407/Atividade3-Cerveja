const PORT = process.env.PORT || 42080
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()

var lista = []


function pegarPrecos(){
    //Continente 
    
    axios.get('https://www.continente.pt/bebidas-e-garrafeira/cervejas-e-sidras/cerveja-branca/?start=0&srule=categories%20top-sellers&pmin=0.01&sz=100')
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)

        const elemSelector = 'div.row:nth-child(4)'

        $(elemSelector).each((index, elem) => {

            $(elem).children().each((childIdx, childElem)=>{
                

                const superMercado = 'Continente'

                const marca = $(childElem).find('div > div> div > p:nth-child(2)').text().toLowerCase()

                var tamanho = ''
                if ($(childElem).find('div > div:nth-child(3)> div:nth-child(1) > p:nth-child(3)').text() != ''){
                    tamanho = $(childElem).find('div > div:nth-child(3)> div:nth-child(1) > p:nth-child(3)').text()
                } else {
                    tamanho = $(childElem).find('div > div:nth-child(2)> div:nth-child(1) > p:nth-child(3)').text()
                }
                //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)
                const preçoAtual = $(childElem).find('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)').text().trim().replace('€','')
        
                //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1)
                var preçoAntigo = ''  
                if($(childElem).find('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1)').attr('content') != undefined){
                    preçoAntigo = $(childElem).find(' div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1)').attr('content')
                } else {
                    preçoAntigo = preçoAtual
                }

                //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)
                var desconto = ''
                if($(childElem).find('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)').text() != ""){
                    desconto = $(childElem).find('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)').text().split("Desconto Imediato: ").pop()
                } else {
                    desconto = "0%"
                }

                //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)
                const preçoPorLitro = $(childElem).find('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)').text().trim().replace('€', '')
                
                if (marca != ''){
                    lista.push({
                        superMercado,
                        marca,
                        tamanho,
                        preçoAtual,
                        preçoAntigo,
                        desconto,
                        preçoPorLitro
                    })
                }
                
            })
            
        })
 

    })
    

    //Auchan
    axios.get('https://www.auchan.pt/pt/bebidas-e-garrafeira/cervejas/cerveja-nacional/?prefn1=soldInStores&prefv1=000&sz=100')
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)

        const elemSelector = '.justify-content-start'

        $(elemSelector).each((index, elem) => {

            $(elem).children().each((childIdx, childElem)=>{
                

                const superMercado = 'Auchan'

                //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4)
                //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)
                const marca = $(childElem).find('div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').text().split('cerveja ').pop().split( /[0-9]/)[0]

                const tamanho = $(childElem).find('div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').text().split(' ').pop()
                
                //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)
                //ou
                //div.auc-product:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)
                var preçoAtual = ''
                if($(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)').text().trim() != ''){
                    preçoAtual = $(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)').text().trim().replace(',','.').replace(' €', '')
                } else {
                    preçoAtual = $(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)').text().trim().replace(',','.').replace(' €', '')
                }
        
                //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > del:nth-child(1) > span:nth-child(1) > span:nth-child(1)
                var preçoAntigo = ''
                if($(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > del:nth-child(1) > span:nth-child(1) > span:nth-child(1)').attr('content') != undefined){
                    preçoAntigo = $(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > del:nth-child(1) > span:nth-child(1) > span:nth-child(1)').attr('content').replace(',','.').replace(' €', '')
                } else {
                    preçoAntigo = preçoAtual
                }

                var desconto = ((parseFloat(preçoAntigo.replace(' €','')) - parseFloat(preçoAtual.replace(' €',''))) / parseFloat(preçoAntigo.replace(' €','')) ) * 100
                desconto = desconto.toFixed(0) + '%'

                //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)
                const preçoPorLitro = $(childElem).find('div:nth-child(3) > div:nth-child(1) > span:nth-child(1)').text().trim().split(' ')[0]
                
                if (marca != ''){
                    lista.push({
                        superMercado,
                        marca,
                        tamanho,
                        preçoAtual,
                        preçoAntigo,
                        desconto,
                        preçoPorLitro
                    })
                }
                
            })
            
        })
 
    })
}

app.get('/', (req, res) => {
    res.json("Bem vindo ao website da cerveja")
})

app.get('/cerveja', (req, res) => {
    pegarPrecos()
    res.json(lista)
})

app.get('/cerveja/:marca', (req, res) => {

    pegarPrecos()

    var marcaId = req.params.marca
    marcaId = marcaId.toUpperCase()

    res.json(lista.filter(item => item.marca.toUpperCase().includes(marcaId)))

})

app.listen(PORT, () => {
    console.log(`O servidor está a ouvir a porta ${PORT}`);
});

