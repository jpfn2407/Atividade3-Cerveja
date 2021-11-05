

window.onload = () => {

    getData();

    async function getData(){
        var request = new Request('/')

        console.log(request)

        await fetch(request).then(async function (response){
            let texto = "";

            var lista = []
            lista = await response.json();
            console.log(lista);

            for(const cerveja of lista){
                texto += `
                <tr style="height: 75px;">
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.superMercado}</td>
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.marca}</td>
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.tamanho}</td>
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.preçoAtual}€</td>
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.preçoAntigo}€</td>
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.desconto}</td>
                  <td class="u-border-1 u-border-grey-30 u-table-cell">${cerveja.preçoPorLitro}€/L</td>
                </tr>
                `;
            }
    
            document.getElementById("table").innerHTML = texto;

            
    
        
        });
    
    } 
}

