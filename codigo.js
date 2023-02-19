var Solusao = [[]]

function Ler_fomulario(){

    let Numero_Entradas = document.getElementById("Numero_Entradas").value
    let Numero_Saidas = document.getElementById("Numero_Saidas").value

    if(Numero_Entradas < 2){
        Numero_Entradas = 2
    }
    if(Numero_Saidas < 1){
        Numero_Saidas = 1
    }

    Criar_Tabela(Numero_Entradas,Numero_Saidas)

    document.getElementById("Valores").innerHTML = ""
    document.getElementById("Valores").innerHTML = "Numero_Entradas = " + Numero_Entradas + " " + "Numero_Saidas = "+Numero_Saidas

}

function Criar_Tabela(Entradas,Saidas){
    
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

    let input = [[]]
    let td = [[]]

    // limpa as variaveis e cria botão
    for(c=0;c<Saidas;c++){
        for(l=0;l<(Entradas-1)*4;l++){
        
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


    let tr = document.createElement("tr")
    let tr2 = document.createElement("tr")

    tr.appendChild(td[[0,0]])
    tr2.appendChild(td[[1,0]])
    
    table.appendChild(tr)
    table.appendChild(tr2)

    tabela.appendChild(table)

    console.log(tabela)

    Resultado(0,0)
}

function Ler_Botao(Botao,Tamanho){

    let id_botao = document.getElementById(""+Botao+Tamanho)

    if(Solusao[[Botao,Tamanho]] == true){
        Solusao[[Botao,Tamanho]] = false
        id_botao.setAttribute("value", "F")
    }else{
        Solusao[[Botao,Tamanho]] = true
        id_botao.setAttribute("value", "V")
    }

    Calculo(Botao,Tamanho)
}

function Calculo(Botao,Tamanho){

    //Solusao[[Botao,Tamanho]]








    document.getElementById("Resultado_Bruto").innerHTML = "";
    document.getElementById("Resultado_Bruto").innerHTML = "funciona";

    Resultado(Botao,Tamanho)
}

function Resultado(Botao,Tamanho){

    document.getElementById("Info_Botao0").innerHTML = "";
    document.getElementById("Info_Botao1").innerHTML = "";
    document.getElementById("Info_Botao2").innerHTML = "";
    document.getElementById("Info_Botao3").innerHTML = "";

    document.getElementById("Info_Botao0").innerHTML = Solusao[[0,Tamanho]] + " " + Botao + Tamanho + " " + Solusao.length;
    document.getElementById("Info_Botao1").innerHTML = Solusao[[1,Tamanho]] + " " + Botao + Tamanho + " " + Solusao.length;
    document.getElementById("Info_Botao2").innerHTML = Solusao[[2,Tamanho]] + " " + Botao + Tamanho + " " + Solusao.length;
    document.getElementById("Info_Botao3").innerHTML = Solusao[[3,Tamanho]] + " " + Botao + Tamanho + " " + Solusao.length;
    
}
