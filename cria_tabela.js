var Solusao = [[]]
var Binario = [[]]

let Numero_Entradas = 2
let Numero_Saidas = 1

//console.log(Solusao)

function Ler_fomulario(){

    Numero_Entradas = document.getElementById("Numero_Entradas").value
    Numero_Saidas = document.getElementById("Numero_Saidas").value
    //Numero_grupos = document.getElementById("Numero_Numero_grupos").value
    let Numero_grupos = 0 // excluir depois

    if(Numero_Entradas < 2){
        Numero_Entradas = 2
    }
    if(Numero_Saidas < 1){
        Numero_Saidas = 1
    }
    if(Numero_grupos < 2){
        Numero_grupos = 2
    }

    Criar_Tabela(Numero_Entradas,Numero_Saidas,Numero_grupos)
}

function Criar_Tabela(Entradas,Saidas,grupos){

    let entrada = Number(Entradas)
    let saida = Number(Saidas)

    let Linhas = 2**Number(Entradas)+1
    let Colunas = Number(Entradas)+Number(Saidas)+1

    // limpa a tabela antes de criar a nova
    var container = document.querySelector("#Tabela");
    var p = document.querySelector("#Tabela table");
    if(p != null){
        container.removeChild(p);
    }

    // Cria a tabela principal
    let tabela = document.getElementById("Tabela")
    let table = document.createElement("table")
    table.setAttribute("id", "remover")

    // Variaveis com elementos criados
    let tr = []
    let td = [[]]
    let elemento = [[]]

    //cria os elementos do titulo
    for(l=65;l<(65+entrada);l++){
        elemento[[0,l-65]] = document.createTextNode(String.fromCharCode(l)) 
    }
    elemento[[0,Entradas]] = document.createTextNode("")
    for(c=entrada+1;c<=(entrada+saida);c++){
        elemento[[0,c]] = document.createTextNode("S"+Number(c-entrada))
    }

    // cria o "="
    for(l=1;l<Linhas;l++){
        elemento[[l,Entradas]] = document.createTextNode("=")
    }

    //cria os botoes
    for(l=1;l<Linhas;l++){
        for(c=entrada+1;c<Colunas;c++){
            elemento[[l,c]] = document.createElement("input")
            elemento[[l,c]].type="button"
            elemento[[l,c]].value="F"

            elemento[[l,c]].setAttribute("id",""+Number(l-1)+Number(c-entrada-1))
            elemento[[l,c]].setAttribute("onclick","Ler_Botao("+Number(l-1)+","+Number(c-entrada-1)+")")
            //console.log("L:"+l+" - C:"+c)
        }
    }

    // cria o "V" e "F"
    let test = 0
    let contador = 0
    for(c=entrada-1;c>=0;c--){
        for(l=1;l<Linhas;l++){
            if(contador < (2**test)){
                elemento[[l,c]] = document.createTextNode("F")
                Binario[[(l-1),c]] = "F"
                contador++
            }else{
                elemento[[l,c]] = document.createTextNode("V")
                Binario[[(l-1),c]] = "V"
                if(contador > (test**2)*2){
                    contador = 0
                }else{
                    contador++
                }
            }
            //console.log("L:"+l+" - C:"+c)
        }
        console.log(2**test)
        contador = 0
        test++
    }
    
    // cria a tabela
    for(l=0;l<Linhas;l++){
        tr[l] = document.createElement("tr")

        for(c=0;c<Colunas;c++){
            td[[l,c]] = document.createElement("td")

            if(elemento[[l,c]] != undefined){
                td[[l,c]].appendChild(elemento[[l,c]])
            }
            
            tr[l].appendChild(td[[l,c]])
            //console.log("L:"+l+" - C:"+c)
        }
        table.appendChild(tr[l])
    }
    
    // Finaliza a criação da tabela
    tabela.appendChild(table)
    console.log(tabela)
}
Criar_Tabela(2,1,4)

function Ler_Botao(Botao,Tamanho){

    let id_botao = document.getElementById(""+Botao+Tamanho)

    if(Solusao[[Botao,Tamanho]] == true){
        Solusao[[Botao,Tamanho]] = false
        id_botao.setAttribute("value", "F")
    }else{
        Solusao[[Botao,Tamanho]] = true
        id_botao.setAttribute("value", "V")
    }
    //console.log(Solusao[[Botao,Tamanho]] + " " + Botao+"/"+Tamanho)
}

function Calculo(){

    let Linhas = 2**Number(Numero_Entradas)
    let Codigo = []
    let Codigo2 = []
    let Codigo_final = []

    let cont_Min = 0
    let cont_Max = 0

    for(c=0;c<Numero_Saidas;c++){
        Codigo[c] = ""
        Codigo2[c] = ""
        Codigo_final[c] = ""

        cont_Min = 0
        cont_Max = 0
        
        for(l=0;l<Linhas;l++){
            
            if(Solusao[[l,c]] == true){
                for(a=65;a<(65+Number(Numero_Entradas));a++){
                    
                    if(Binario[[l,(a-65)]] == "F"){
                        Codigo[c] = Codigo[c] + String.fromCharCode(a)
                        Codigo[c] = `${Codigo[c]}\"`
                        Codigo[c] = Codigo[c] + "."
                    }else{
                        Codigo[c] = Codigo[c] + String.fromCharCode(a)
                        Codigo[c] = Codigo[c] + "."
                    }
                    
                }
                Codigo[c] = Codigo[c].slice(0,-1)
                Codigo[c] = Codigo[c] + "+"

                cont_Min++
            }else{
                for(a=65;a<(65+Number(Numero_Entradas));a++){
                    
                    if(Binario[[l,(a-65)]] == "V"){
                        Codigo2[c] = Codigo2[c] + String.fromCharCode(a)
                        Codigo2[c] = `${Codigo2[c]}\"`
                        Codigo2[c] = Codigo2[c] + "+"
                    }else{
                        Codigo2[c] = Codigo2[c] + String.fromCharCode(a)
                        Codigo2[c] = Codigo2[c] + "+"
                    }
                    
                }
                Codigo2[c] = Codigo2[c].slice(0,-1)
                Codigo2[c] = Codigo2[c] + "."

                cont_Max++
            }
        }

        Codigo[c] = Codigo[c].slice(0,-1)
        Codigo2[c] = Codigo2[c].slice(0,-1)

        console.log("Min:" + cont_Min + " --- " + "Max:" +cont_Max)

        if(cont_Max > cont_Min){
            Codigo_final[c] = Codigo[c]
            if(Codigo_final[c] == ""){
                Codigo_final[c] = "apenas F"
            }

        }else{
            Codigo_final[c] = Codigo2[c]
            if(Codigo_final[c] == ""){
                Codigo_final[c] = "apenas V"
            }

        }
        //console.log("Solução Max "+Number(c+1)+" "+ Codigo[c])
        //console.log("Solução Min "+Number(c+1)+" "+ Codigo2[c])
        console.log("Solução "+Number(c+1)+" "+ Codigo_final[c])

    }
    
    let r1 = Simplificar(Codigo[0])
    console.log("- - - - - - - - - - - - - -")
    let r2 = Simplificar(Codigo2[0])
    console.log("- - - - - - - - - - - - - -")

    let solu = []
    let div_solu = document.getElementById("solu")

    for(a=0;a<Codigo_final.length;a++){
        solu[a] = document.createElement("p")
        solu[a].innerText = `S${a+1} = ${Simplificar(Codigo_final[a])}`
        div_solu.appendChild(solu[a])
    }
    
    let hr = []
    hr[hr.length-1] = document.createElement("hr")
    div_solu.appendChild(hr[hr.length-1])

    console.log(`Min:${r1} | Max:${r2}`)
    console.log("------------")
}