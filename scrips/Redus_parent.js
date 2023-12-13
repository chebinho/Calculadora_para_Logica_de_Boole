function Redus_parent(Valor){

    const A_paren = /((?<!\.)(([A-Z]"?)(\+|\.))+)(\((([A-Z]"?(\+|\.))+([A-Z]"?))\))/g
    // A.(B+C") = A.B+A.C" ! $1 $6
    const paren_A = /(\((([A-Z]"?(\+|\.))+([A-Z]"?))\))(((\+|\.)([A-Z]"?))+(?!\.))/g
    // (B+C").A = A.B+A.C" ! $1 $6
    const paren_paren = /\((([A-Z]"?)|\.|\+)*((\(([A-Z]"?(\+|\.))+[A-Z]"?\)(\+|\.))+\(([A-Z]"?(\+|\.))+[A-Z]"?\))(([A-Z]"?)|\.|\+)*\)/g
    // ((B+C").(A+D)) | (A+(B+C").(A+D)) | (A+(B+C").(A+D)+(C+D)) ! $3

    let c = 0
    while( c>=1 ){
        if(Valor.match(A_paren) != null){

            c++
        }else if(Valor.match(paren_A) != null){

            c++
        }else if(Valor.match(paren_paren) != null){

            c++
        }else{
            c++
        }

    }

    return Valor
}