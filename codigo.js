var valor = []

function Ler_Botao(Botao,Tamanho){

    let test = document.getElementById(Botao)

    if(valor[Botao] == true){
        valor[Botao] = false
        test.setAttribute("value", "F")
    }else{
        valor[Botao] = true
        test.setAttribute("value", "V")
    }

    Resultado(Botao)
    Calculo(Botao,Tamanho)
}

function Calculo(Botao,Tamanho){

    

    Resultado(Botao ,Tamanho)
}

function Resultado(Botao,Tamanho){

    document.getElementById("Valores").innerHTML = ""
    document.getElementById("Resultado").innerHTML = "";
    document.getElementById("Resultado").innerHTML = valor[Botao] + " " + Botao + " " + valor.length;
    document.getElementById("Valores").innerHTML = Tamanho
    
}