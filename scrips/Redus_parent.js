function Redus_parent(Valor){

    const verifica = /\(([A-Z]"?|\+|\.)*\(([A-Z]"?|\+|\.)*\)([A-Z]"?|\+|\.)*\)/g
    // (()) | (A+C.(A).T)

    const paren_paren = /((\(([A-Z]"?(\+|\.))+[A-Z]"?\)(\+|\.))\(([A-Z]"?(\+|\.))+[A-Z]"?\))(((\.|\+)\(([A-Z]"?(\+|\.))+[A-Z]"?\))*)?/g
    // ((B+C").(A+D)) | (A+(B+C").(A+D)) | (A+(B+C").(A+D)+(C+D)) ! $1 $8
    const A_paren = /((?<!\.)(([A-Z]"?)(\+|\.))+)(\((([A-Z]"?(\+|\.))+([A-Z]"?))\))/g
    // A.(B+C") = A.B+A.C" ! $1 $6
    const paren_A = /(\((([A-Z]"?(\+|\.))+([A-Z]"?))\))(((\+|\.)([A-Z]"?))+(?!\.))/g
    // (B+C").A = A.B+A.C" ! $1 $6

    let c = 0
    while(c != 1){
        if(Valor.match(paren_paren) != null){

            let a = Valor.match(paren_paren)
            Valor = Valor.replace(paren_paren,'(/?/)')

            for(l=0;l<a.length;l++){
                let grupo_calculo = a[l].replace(paren_paren,"$1")
                let grupo_resto = a[l].replace(paren_paren,"$8")

                const regex = /(\(([A-Z]"?|\+|\.)+\))(\+|\.)(\(([A-Z]"?|\+|\.)+\))/g

                let grupo_l1 = grupo_calculo.replace(regex,"$1")
                let sinal_meio = grupo_calculo.replace(regex,"$3")
                let grupo_l2 = grupo_calculo.replace(regex,"$4")

                let sinal_g1 = grupo_l1.match(/(\+|\.)/g)
                let sinal_g2 = grupo_l2.match(/(\+|\.)/g)

                grupo_l1 = grupo_l1.match(/[A-Z]"?/g)
                grupo_l2 = grupo_l2.match(/[A-Z]"?/g)

                console.log(grupo_l1)
                console.log(sinal_g1)
                console.log(sinal_meio)
                console.log(grupo_l2)
                console.log(sinal_g2)
                console.log(grupo_resto)

                Valor = Valor.replace(/\(\/\?\/\)/,a[l])
            }

            c++
        }else if(Valor.match(A_paren) != null){

            c++
        }else if(Valor.match(paren_A) != null){

            c++
        }else{
            c++
        }
        //console.log(Valor)
    }
    console.log(" - - - - - - - - - ")
    return Valor
}

/*
                let letra = a[l].match(/([A-Z]"?)/g)
                let sinais = a[l].match(paren_paren).toString()
                sinais = sinais.replace(/([A-Z]"?)/g,"")

                

                let sinal_meio = sinais.match(/\)(\+|\.)\(/g)
                for(t=0;t<sinal_meio.length;t++){
                    sinal_meio[t] = sinal_meio[t].replace(/\(|\)/g,"")
                }

                sinais = sinais.match(/\(((\+|\.)+)\)/g)
                for(t=0;t<sinais.length;t++){
                    sinais[t] = sinais[t].replace(/\(|\)/g,"")
                }

                let grupo_l1 = sinais[0].match(/(\+|\.)/g)
                let grupo_l2 = sinais[1].match(/(\+|\.)/g)

                
                console.log(letra)
                console.log(sinal_meio)
                console.log(sinais)
                console.log("//////////")
                console.log(grupo_l1)
                console.log(grupo_l2)


*/