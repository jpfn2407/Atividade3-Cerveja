const axios = require('axios')
const cheerio = require('cheerio')


exports.fetchWebsitesData = (req, res) => {
    var lista = []

    getData();

    async function getData(){
    
        //Continente 
        
        await axios.get('https://www.continente.pt/bebidas-e-garrafeira/cervejas-e-sidras/cerveja-branca/?start=0&srule=categories%20top-sellers&pmin=0.01&sz=10000',  {timeout: 1000})
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)
    
            const elemSelector = 'div.row:nth-child(4)'
    
            $(elemSelector).each((index, elem) => {
    
                $(elem).children().each((childIdx, childElem)=>{
                    
    
                    const superMercado = 'Continente'
    
                    const marca = $(childElem).find('div > div> div > p:nth-child(2)').text().toLowerCase().trim()
    
                    var tamanho = ''
                    if ($(childElem).find('div > div:nth-child(3)> div:nth-child(1) > p:nth-child(3)').text() != ''){
                        tamanho = $(childElem).find('div > div:nth-child(3)> div:nth-child(1) > p:nth-child(3)').text().trim()
                    } else {
                        tamanho = $(childElem).find('div > div:nth-child(2)> div:nth-child(1) > p:nth-child(3)').text().trim()
                    }
                    //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)
                    const preçoAtual = $(childElem).find('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)').text().trim().replace('€','').replace(',','.').trim()
            
                    //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1)
                    var preçoAntigo = ''  
                    if($(childElem).find('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1)').attr('content') != undefined){
                        preçoAntigo = $(childElem).find(' div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1)').attr('content').replace(',','.').trim()
                    } else {
                        preçoAntigo = preçoAtual
                    }
    
                    //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)
                    //var desconto = ''
                    //if($(childElem).find('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)').text() != ""){
                    //    desconto = $(childElem).find('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)').text().split("Desconto Imediato: ").pop()
                    //} else {
                    //    desconto = "0%"
                    //}
                  
                    //var desconto = ((parseFloat(preçoAntigo.replace(' €', '')) - parseFloat(preçoAtual.replace(' €', '')) / parseFloat(preçoAntigo.replace(' €', '')) )) * 100
                    var desconto = ((parseFloat(preçoAntigo) - parseFloat(preçoAtual))/parseFloat(preçoAntigo)) * 100
                    //var desconto = (parseFloat(preçoAtual) * 100 / parseFloat(preçoAntigo)) 
                    desconto = desconto.toFixed(0) + '%'
                    desconto.trim()
    
                    //.pid-2050624 > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)
                    const preçoPorLitro = $(childElem).find('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)').text().trim().replace('€', '').replace(',','.').trim()
                    
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
        }).catch((error) => {
            
        });
        
    
        //Auchan
        await axios.get('https://www.auchan.pt/pt/bebidas-e-garrafeira/cervejas/cerveja-nacional/?prefn1=soldInStores&prefv1=000&sz=10000',  {timeout: 1000})
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)
    
            const elemSelector = '.justify-content-start'
    
            $(elemSelector).each((index, elem) => {
    
                $(elem).children().each((childIdx, childElem)=>{
                    
    
                    const superMercado = 'Auchan'
    
                    //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4)
                    //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)
                    const marca = $(childElem).find('div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').text().split('cerveja ').pop().split( /[0-9]/)[0].trim()
    
                    const tamanho = $(childElem).find('div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').text().split(' ').pop().trim()
                    
                    //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)
                    //ou
                    //div.auc-product:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)
                    var preçoAtual = ''
                    if($(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)').text().trim() != ''){
                        preçoAtual = $(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)').text().trim().replace(',','.').replace(' €', '').trim()
                    } else {
                        preçoAtual = $(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)').text().trim().replace(',','.').replace(' €', '').trim()
                    }
            
                    //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > del:nth-child(1) > span:nth-child(1) > span:nth-child(1)
                    var preçoAntigo = ''
                    if($(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > del:nth-child(1) > span:nth-child(1) > span:nth-child(1)').attr('content') != undefined){
                        preçoAntigo = $(childElem).find('div:nth-child(4) > div:nth-child(1) > span:nth-child(1) > del:nth-child(1) > span:nth-child(1) > span:nth-child(1)').attr('content').replace(',','.').replace(' €', '').trim()
                    } else {
                        preçoAntigo = preçoAtual
                    }
    
    
                    var desconto = ((parseFloat(preçoAntigo.replace(' €','')) - parseFloat(preçoAtual.replace(' €',''))) / parseFloat(preçoAntigo.replace(' €','')) ) * 100
                    desconto = desconto.toFixed(0) + '%'
                    desconto.trim()
    
                    //div.auc-product:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)
                    const preçoPorLitro = $(childElem).find('div:nth-child(3) > div:nth-child(1) > span:nth-child(1)').text().trim().split(' ')[0].replace(',','.').trim()
                    
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
     
        }).catch((error) => {          
        });
    
    
        //Intermache
        await axios.get('https://lojaonline.intermarche.pt/69-agualva---cacem/rayon/bebidas/cervejas/10340-cervejas-com-alcool', {timeout: 1000})
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)
    
            //li.vignette_produit_info:nth-child(1)
            //li.vignette_produit_info:nth-child(71)
            const elemSelector = 'li.vignette_produit_info'
    
            $(elemSelector).each((index, elem) => {
    
                const superMercado = 'Intermache'
                //li.vignette_produit_info:nth-child(1) > div:nth-child(1) > div:nth-child(3) > p:nth-child(1)
                //li.vignette_produit_info:nth-child(71) > div:nth-child(1) > div:nth-child(3) > p:nth-child(1)
                const marca = $(elem).find('li.vignette_produit_info > div:nth-child(1) > div:nth-child(3) > p:nth-child(1)').text().trim()
    
                //li.vignette_produit_info:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > span:nth-child(1)
                const tamanho = $(elem).find('li.vignette_produit_info > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > span:nth-child(1)').text().trim()
    
                //li.vignette_produit_info:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > p:nth-child(2)
                //li.vignette_produit_info:nth-child(3) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > p:nth-child(2)
                const preçoAtual = $(elem).find('li.vignette_produit_info > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > p:nth-child(2)').text().replace(',','.').replace(' €', '').trim()
    
                //li.vignette_produit_info:nth-child(3) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > del:nth-child(1)
                //li.vignette_produit_info:nth-child(3) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > del:nth-child(1)
                var preçoAntigo = ''
                    if($(elem).find('li.vignette_produit_info > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > del:nth-child(1)').text() != ''){
                        preçoAntigo = $(elem).find('li.vignette_produit_info > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > del:nth-child(1)').text().replace(',','.').replace(' €', '').trim()
                    } else {
                        preçoAntigo = preçoAtual
                    }
    
                var desconto = ((parseFloat(preçoAntigo.replace(' €','')) - parseFloat(preçoAtual.replace(' €',''))) / parseFloat(preçoAntigo.replace(' €','')) ) * 100
                desconto = desconto.toFixed(0) + '%'
                desconto.trim()
    
    
                //li.vignette_produit_info:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > p:nth-child(3)
                const preçoPorLitro = $(elem).find('li.vignette_produit_info > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > p:nth-child(3)').text().trim().split(' ')[0].replace(',','.').trim()
    
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
        }).catch((error) => {
        });

        res.json(lista);
    }
        
        
  };