var Solusao = [[]]
var Binario = [[]]

let Numero_Entradas = 2
let Numero_Saidas = 1

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

function Criar_Tabela(Entradas=2,Saidas=1,grupos=4){

    let entrada = Number(Entradas)
    let saida = Number(Saidas)

    let Linhas = 2**entrada+1
    let Colunas = entrada+saida+1

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
                elemento[[l,c]] = document.createTextNode("V")
                Binario[[(l-1),c]] = "V"
                contador++
            }else{
                elemento[[l,c]] = document.createTextNode("F")
                Binario[[(l-1),c]] = "F"
                if(contador < (2**test)*2-1){
                    contador++
                }else{
                    contador = 0
                }
            }
            //console.log("L:"+l+" - C:"+c)
        }
        contador = 0
        test++
    }
    
    // cria a tabela
    for(l=0;l<Linhas;l++){
        tr[l] = document.createElement("tr")

        for(c=0;c<Colunas;c++){
            td[[l,c]] = document.createElement("td")
            //if(elemento[[l,c]] != undefined){ // if para fazer tests
                td[[l,c]].appendChild(elemento[[l,c]])
            //}
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
    let Expressao_Min = []
    let Expressao_Max = []
    let Expressao_Final = []
    //N_Letra()
    for(c=0;c<Numero_Saidas;c++){
        Expressao_Min[c] = ""
        Expressao_Max[c] = ""

        for(l=0;l<Linhas;l++){

            if(Solusao[[l,c]] == true){

                for(a=0;a<Numero_Entradas;a++){
                    if(Binario[[l,a]] == "F"){
                        Expressao_Min[c] = Expressao_Min[c] + N_Letra(a)+'"'
                        Expressao_Min[c] = Expressao_Min[c] + "."
                    }else{
                        Expressao_Min[c] = Expressao_Min[c] + N_Letra(a)
                        Expressao_Min[c] = Expressao_Min[c] + "."
                    }
                }
                Expressao_Min[c] = Expressao_Min[c].slice(0,-1)
                Expressao_Min[c] = Expressao_Min[c] + "+"
            }else{
                for(a=0;a<(Number(Numero_Entradas));a++){

                    if(Binario[[l,a]] == "F"){
                        Expressao_Max[c] = Expressao_Max[c] + N_Letra(a)+'"'
                        Expressao_Max[c] = Expressao_Max[c] + "+"
                    }else{
                        Expressao_Max[c] = Expressao_Max[c] + N_Letra(a)
                        Expressao_Max[c] = Expressao_Max[c] + "+"
                    }
                }
                Expressao_Max[c] = Expressao_Max[c].slice(0,-1)
                Expressao_Max[c] = Expressao_Max[c] + "."
            }
            
        }
        Expressao_Min[c] = Expressao_Min[c].slice(0,-1)
        Expressao_Max[c] = Expressao_Max[c].slice(0,-1)

        Expressao_Min[c] = "("+Expressao_Min[c]+")"
        Expressao_Max[c] = "("+Expressao_Max[c]+")"

        Expressao_Min[c] = Expressao_Min[c].replace(/\+/g,"\)\+\(")
        Expressao_Max[c] = Expressao_Max[c].replace(/\./g,"\)\.\(")

        // declara a menor expressão 
        if(Expressao_Max[c].length > Expressao_Min[c].length){
            Expressao_Final[c] = Expressao_Min[c]
            if(Expressao_Final[c] == "()"){
                Expressao_Final[c] = "0"
            }
        }else{
            Expressao_Final[c] = Expressao_Max[c]
            if(Expressao_Final[c] == "()"){
                Expressao_Final[c] = "1"
            }
        }
    }

    let solu = []
    let div_solu = document.getElementById("solu")

    for(a=0;a<Expressao_Final.length;a++){
        solu[a] = document.createElement("p")
        solu[a].innerText = `S${a+1} = ${Simplificar(Expressao_Final[a])}`
        div_solu.appendChild(solu[a])
    }
    
    let hr = []
    hr[hr.length-1] = document.createElement("hr")
    div_solu.appendChild(hr[hr.length-1])

}

function N_Letra(valor=0,base=26,caracter_inicial=65){ // test sem limite
    if(valor < 0){
        return "_"
    }else{
        if(valor < base){
            //console.log(String.fromCharCode(valor+caracter_inicial))
            return String.fromCharCode(valor+caracter_inicial)

        }else {
            let resul = N_Letra(valor%base)
            resul = N_Letra((valor/base-1)) + resul

            //console.log(resul)
            return resul
        }
    }
}