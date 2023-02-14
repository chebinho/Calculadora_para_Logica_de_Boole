var Solusao = [[],[]]

function Ler_fomulario(){

    let Numero_Entradas = document.getElementById("Numero_Entradas").value
    let Numero_Saidas = document.getElementById("Numero_Saidas").value

    if(Numero_Entradas < 2){
        Numero_Entradas = 2
    }
    if(Numero_Saidas < 1){
        Numero_Saidas = 1
    }

    document.getElementById("Valores").innerHTML = ""
    document.getElementById("Valores").innerHTML = "Numero_Entradas = " + Numero_Entradas + " " + "Numero_Saidas = "+Numero_Saidas

}

function Ler_Botao(Botao,Tamanho){

    let id_botao = document.getElementById(""+Botao+Tamanho)

    if(Solusao[[Tamanho],[Botao]] == true){
        Solusao[[Tamanho],[Botao]] = false
        id_botao.setAttribute("value", "F")
    }else{
        Solusao[[Tamanho],[Botao]] = true
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

    document.getElementById("Info_Botao").innerHTML = "";
    document.getElementById("Info_Botao").innerHTML = Solusao[[Tamanho],[Botao]] + " " + Botao + " " + Solusao.length;
    
}