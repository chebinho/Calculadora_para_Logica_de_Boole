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
    let A_ = (A==false)
    let B_ = (B==false)
    let C_ = (C==false)
    //console.log(A+" - "+B+" - "+C)

    //S1 = (A"+B).(A+B")
    if( (A_||B)&&(A||B_) ){
        troca_cor("S1","V")
    }else{
        troca_cor("S1","F")
    }

    //S2 = (A"+B+C").(A+B"+C)
    if( (A_||B||C_)&&(A||B_||C) ){
        troca_cor("S2","V")
    }else{
        troca_cor("S2","F")
    }

    //S3 = (A"+B").(A+B)
    if( (A_||B_)&&(A||B) ){
        troca_cor("S3","V")
    }else{
        troca_cor("S3","F")
    }
    
    //S4 = (A"+B"+C").(A+B+C)
    if( (A_||B_||C_)&&(A||B||C) ){
        troca_cor("S4","F")
    }else{
        troca_cor("S4","V")
    }
    
}
calculo()


function troca_cor(valor,sinal="F"){
    let Solu = document.getElementById(valor)

    if(sinal == "V"){
        Solu.style.backgroundColor = "green"
    }else{
        Solu.style.backgroundColor = "red"
    }

}

//S1 = (A"+B).(A+B")
//S2 = (A"+B+C").(A+B"+C)
//S3 = (A"+B").(A+B)
//S4 = (A+B+C).(A"+B"+C")