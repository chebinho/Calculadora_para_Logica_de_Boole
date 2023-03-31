var Solusao = [[]]
var Binario = [[]]
var Codigo = []

var Numero_Entradas = 2
var Numero_Saidas = 1

function Ler_fomulario(){

    Numero_Entradas = document.getElementById("Numero_Entradas").value
    Numero_Saidas = document.getElementById("Numero_Saidas").value

    if(Numero_Entradas < 2){
        Numero_Entradas = 2
    }
    if(Numero_Saidas < 1){
        Numero_Saidas = 1
    }

    Criar_Tabela(Numero_Entradas,Numero_Saidas)

}

function Criar_Tabela(Entradas,Saidas){

    let Linhas = 2**Number(Entradas)
    
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

    let titulo_elementos = []
    let titulo_linha = []

    let VF = [[]]
    let VF_td = [[]]

    let input = [[]]
    let td = [[]]
    let tr = []

    // Cria o titulo
    for(l=65;l<(65+Number(Entradas));l++){
        titulo_elementos[l-65] = document.createTextNode(String.fromCharCode(l)) 
    }

    titulo_elementos[Entradas] = document.createTextNode("")

    for(c=Number(Entradas)+1;c<=(Number(Entradas)+Number(Saidas));c++){
        titulo_elementos[c] = document.createTextNode("S"+Number(c-Entradas))
    }
    
    tr[0] = document.createElement("tr")
    for(c=0;c<(Number(Entradas)+Number(Saidas)+1);c++){       
        titulo_linha[c] = document.createElement("td")
        titulo_linha[c].appendChild(titulo_elementos[c])
        tr[0].appendChild(titulo_linha[c])
    }
    table.appendChild(tr[0])

    // Criar o V F da tabela
    let conta_coluna = 0
    let conta_linha = 0

    let test = 0

    for(c=1;c<=(Linhas/2);c=c*2){
        for(l=0;l<(Linhas/c);l++){
            if(test == 1){
                test = 0
                for(a=0;a<c;a++){
                    VF[[conta_linha,conta_coluna]] = document.createTextNode("V")
                    Binario[[conta_linha,conta_coluna]] = "V"
                    conta_linha = conta_linha+1
                }
            }else{
                test = 1
                for(a=0;a<c;a++){
                    VF[[conta_linha,conta_coluna]] = document.createTextNode("F")
                    Binario[[conta_linha,conta_coluna]] = "F"
                    conta_linha = conta_linha+1
                }
            }
        }
        conta_coluna = conta_coluna + 1
        conta_linha = 0
    }
    for(c=0;c<Entradas;c++){
        for(l=0;l<Linhas;l++){

            VF_td[[l,c]] = document.createElement("td")
            VF_td[[l,c]].appendChild(VF[[l,c]])
        }
    }
    for(l=0;l<Linhas;l++){
        VF[[l,c]] = document.createTextNode("=")

        VF_td[[l,c]] = document.createElement("td")
        VF_td[[l,c]].appendChild(VF[[l,c]])
    }

    // limpa as variaveis e cria botão
    for(c=0;c<Saidas;c++){
        for(l=0;l<Linhas;l++){
        
            Solusao[[l,c]] = false

            input[[l,c]] = document.createElement("input")
            input[[l,c]].type="button"
            input[[l,c]].value="F"
            input[[l,c]].setAttribute("id",""+l+c)
            input[[l,c]].setAttribute("onclick","Ler_Botao("+l+","+c+")")

            td[[l,c]] = document.createElement("td")
            td[[l,c]].appendChild(input[[l,c]])

        }
    }

    // adiciona as linhas nas colunas
    for(l=1;l<(Linhas+1);l++){
        tr[l] = document.createElement("tr")
        for(c=0;c<Number(Entradas)+1;c++){
            tr[l].appendChild(VF_td[[(l-1),c]])
        }
        for(c=0;c<Saidas;c++){
            tr[l].appendChild(td[[(l-1),c]])
        }
        table.appendChild(tr[l])
    }

    tabela.appendChild(table)
    console.log(tabela)

}
Criar_Tabela(2,1)

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

function Calculo(){

    let Linhas = 2**Number(Numero_Entradas)

    for(c=0;c<Numero_Saidas;c++){
        Codigo[c] = ""
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
            }

        }
        Codigo[c] = Codigo[c].slice(0,-1)
        console.log("Solução "+Number(c+1)+" "+ Codigo[c])
    }
    console.log("------------")
    for(c=0;c<Numero_Saidas;c++){
        Codigo[c] = Simplificar(Codigo[c])
    }

    document.getElementById("Resultado_Bruto").innerHTML = "";
    document.getElementById("Resultado_Bruto").innerHTML = Codigo[0]
}

function Simplificar(Bruto){

    let Resumido = Bruto
    let cont = 65
    let exe = 0

    while(cont == 0){
        exe = exe +1
        if(true == false){

        }else{
            cont=1
        }
    }

    console.log(exe)
    console.log(Resumido)
    return Resumido
}

function tests(){

    // * 0 ou n
    // + 1 ou n
    // ? 0 ou 1

    let Resumido = 'A".B".C".D"+A.B".C".D"+A".B.C".D"+A.B.C".D"+A".B".C.D"+A.B".C.D"+A".B.C.D"+A.B.C.D"+A.B".C".D+A.B.C".D+A.B".C.D+A.B.C.D'
    let test = 'A+A".B A+0 Z+1 A"+A A+B C+C+C+C "G.G G".G A+(A.C) V+(V.V) S+(C.S)'

    const adi_1 = /[A-Z]\+0/g // = A + 0 = A
    const adi_2 = /[A-Z]\+1/g // = A + 1 = 1
    const adi_3 = /([A-Z])\+\1/g // = A + A = A
    const adi_4 = /(([A-Z])"\+\2)|(([A-Z])\+\4")/g // = A + Ā = 1

    const mult_1 = /[A-Z]\.0/g // = A . 0 = 0
    const mult_2 = /[A-Z]\.1/g // = A . 1 = A
    const mult_3 = /([A-Z])\.\1/g //  A . A = A
    const mult_4 = /(([A-Z])"\.\2)|(([A-Z])\.\4")/g // A . Ā = 0
    //
    const abisor_adi = /([A-Z])\+\((\1\.([A-Z](?<!\1)))\)/g // A + (A.B) = A
    const abisor_mult = /([A-Z])\.\((\1\+([A-Z](?<!\1)))\)/g // A . (A+B) = A
    //
    const asso_adi = 0 // A+(B+C) = (A+B)+C = A+B+C
    const asso_mult = 0 // A.(B.C) = (A.B).C = A.B.C

    const distri_adi = 0 // A+(B.C) = (A+B) . (A+C)
    const distri_mult = 0 // A.(B+C) = A.B + A.C 

    const outra_adi = 0 // A + Ā.B = A + B
    const outra_mult = 0 // (A+B).(A+C) = A + B.C

    const morgan_adi = 0 // (A.B)’ = A' + B'
    const morgan_mult = 0 // (A+B)’ = A' . B'

    const morgan_adi_n = 0 // (A.B ... n)’ = A' + B' ... n'
    const morgan_mult_n = 0 // (A+B ... n)’ = A' . B' ... n'
    //
    const comu_adi = 0 // A + B = B + A
    const comu_mult = 0 // A . B = B . A

    console.log(test)
    console.log(test.match(abisor_adi))

    
    let exe = 0
    let cont = 0

    while(cont == 5){
        exe = exe +1
        if((Resumido.match(abisor_adi)) != null){

        }else{
            cont = cont+1
        }
    }

    console.log(exe)
    console.log(Resumido)

}
