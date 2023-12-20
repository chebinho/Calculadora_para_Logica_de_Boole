function Redus_parent(Valor){

    const paren_paren = /((\(([A-Z]"?(\+|\.))+[A-Z]"?\)(\+|\.))+\(([A-Z]"?(\+|\.))+[A-Z]"?\))/g
    // ((B+C").(A+D)) | (A+(B+C").(A+D)) | (A+(B+C").(A+D)+(C+D)) ! $3
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
                let letra = a[l].match(/([A-Z]"?)/g)
                let sinais = a[l].match(paren_paren).toString()
                sinais = sinais.replace(/([A-Z]"?)/g,"")

                console.log(letra)
                console.log(sinais)

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