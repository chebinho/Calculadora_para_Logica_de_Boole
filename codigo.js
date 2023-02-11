var valor = []

function Ler_Botao(Botao){

    let test = document.getElementById(Botao)

    if(valor[Botao] == true){
        valor[Botao] = false
        test.setAttribute("value", "F")
    }else{
        valor[Botao] = true
        test.setAttribute("value", "V")
    }

    document.getElementById("Resultado").innerHTML = "";
    document.getElementById("Resultado").innerHTML = valor[Botao] + " " + Botao;

}