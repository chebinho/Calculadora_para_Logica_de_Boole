var Solusao = [[]]
var Binario = [[]]

//console.log(Solusao)

function Ler_fomulario(){

    let Numero_Entradas = document.getElementById("Numero_Entradas").value
    let Numero_Saidas = document.getElementById("Numero_Saidas").value
    //Numero_grupos = document.getElementById("Numero_Numero_grupos").value
    let Numero_grupos = 0

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

    // Variaveis importantes
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
        
    

    /*
        elemento[[l,c]] = document.createElement("input")
        elemento[[l,c]].type="button"
        elemento[[l,c]].value="F"
        elemento[[l,c]].setAttribute("id",""+l+c)
        elemento[[l,c]].setAttribute("onclick","Ler_Botao("+l+","+c+")")
    */


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
Criar_Tabela(2,1,5)

function Ler_Botao(Botao,Tamanho){

    let id_botao = document.getElementById(""+Botao+Tamanho)

    if(Solusao[[Botao,Tamanho]] == true){
        Solusao[[Botao,Tamanho]] = false
        id_botao.setAttribute("value", "F")
    }else{
        Solusao[[Botao,Tamanho]] = true
        id_botao.setAttribute("value", "V")
    }
    console.log(Solusao[[Botao,Tamanho]] + " " + Botao+"/"+Tamanho)
}