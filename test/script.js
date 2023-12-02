let Variaveis = [false,false,false]

function troca_valor(botao){

    let Botao = document.getElementById(botao)

    if(Botao.value == "F"){
        Botao.value = "V"
        Variaveis[botao] = true
        calculo()

    }else{
        Botao.value = "F"
        Variaveis[botao] = false
        calculo()
    }
}

function calculo(){
    let A = Variaveis[0]
    let B = Variaveis[1]
    let C = Variaveis[2]

    //console.log(A+" - "+B+" - "+C)

    let S1 = document.getElementById("S1")
    let S2 = document.getElementById("S2")
    let S3 = document.getElementById("S3")
    let S4 = document.getElementById("S4")


}
calculo()

//S1 = (A"+B).(A+B")
//S2 = (A"+B+C").(A+B"+C)
//S3 = (A"+B").(A+B)
//S4 = (A+B+C).(A"+B"+C")