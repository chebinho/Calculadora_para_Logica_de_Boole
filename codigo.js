var valor = []

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

function Ler_Botao(Botao){

    let test = document.getElementById(Botao)

    if(valor[Botao] == true){
        valor[Botao] = false
        test.setAttribute("value", "F")
    }else{
        valor[Botao] = true
        test.setAttribute("value", "V")
    }

    Resultado(Botao)
    Calculo(Botao)
}

function Calculo(Botao){

    Numero_Entradas

    Resultado(Botao)
}

function Resultado(Botao){

    document.getElementById("Resultado").innerHTML = "";
    document.getElementById("Resultado").innerHTML = valor[Botao] + " " + Botao + " " + valor.length;
    
}