var Solusao = [[]]
var contar = []

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

    for(e=0;e<Saidas;e++){
        for(i=0;i<(Entradas-1)*4;i++){
        
            Solusao[[i,e]] = false
            
        }
    }

    let tabela = document.getElementById("Tabela")

    let tr = document.createElement("tr")
    let td = document.createElement("td")

    let texto = document.createTextNode("funciona por favor")

    td.appendChild(texto)
    tr.appendChild(td)
    tabela.appendChild(tr)

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

function Test_Contador(){
    
    if(contar[0] == 1){

        contar[0] = 0

    }else{

        contar[0] = 1
        
    }

    console.log(contar)

}