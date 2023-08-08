var Solusao = [[]]
var Binario = [[]]

var Numero_Entradas = 2
var Numero_Saidas = 1

function Ler_fomulario(){

    Numero_Entradas = document.getElementById("Numero_Entradas").value
    Numero_Saidas = document.getElementById("Numero_Saidas").value

    if(Numero_Entradas < 2){
        Numero_Entradas = 2
    }
    if(Numero_Saidas < 1){
        Numero_Saidas = 1
    }

    Criar_Tabela(Numero_Entradas,Numero_Saidas)

}

function Criar_Tabela(Entradas,Saidas){

    let Linhas = 2**Number(Entradas)
    
    // limpa a tabela antes de criar a nova
    var container = document.querySelector("#Tabela");
    var p = document.querySelector("#Tabela table");
    if(p != null){
        container.removeChild(p);
    }

    // Cria a tabela principal
    let tabela = document.getElementById("Tabela")
    let table = document.createElement("table")
    table.setAttribute("id", "remover")

    let titulo_elementos = []
    let titulo_linha = []

    let VF = [[]]
    let VF_td = [[]]

    let input = [[]]
    let td = [[]]
    let tr = []

    // Cria o titulo
    for(l=65;l<(65+Number(Entradas));l++){
        titulo_elementos[l-65] = document.createTextNode(String.fromCharCode(l)) 
    }

    titulo_elementos[Entradas] = document.createTextNode("")

    for(c=Number(Entradas)+1;c<=(Number(Entradas)+Number(Saidas));c++){
        titulo_elementos[c] = document.createTextNode("S"+Number(c-Entradas))
    }
    
    tr[0] = document.createElement("tr")
    for(c=0;c<(Number(Entradas)+Number(Saidas)+1);c++){       
        titulo_linha[c] = document.createElement("td")
        titulo_linha[c].appendChild(titulo_elementos[c])
        tr[0].appendChild(titulo_linha[c])
    }
    table.appendChild(tr[0])

    // Criar o V F da tabela
    let conta_coluna = 0
    let conta_linha = 0

    let test = 0

    for(c=1;c<=(Linhas/2);c=c*2){
        for(l=0;l<(Linhas/c);l++){
            if(test == 1){
                test = 0
                for(a=0;a<c;a++){
                    VF[[conta_linha,conta_coluna]] = document.createTextNode("V")
                    Binario[[conta_linha,conta_coluna]] = "V"
                    conta_linha = conta_linha+1
                }
            }else{
                test = 1
                for(a=0;a<c;a++){
                    VF[[conta_linha,conta_coluna]] = document.createTextNode("F")
                    Binario[[conta_linha,conta_coluna]] = "F"
                    conta_linha = conta_linha+1
                }
            }
        }
        conta_coluna = conta_coluna + 1
        conta_linha = 0
    }
    for(c=0;c<Entradas;c++){
        for(l=0;l<Linhas;l++){

            VF_td[[l,c]] = document.createElement("td")
            VF_td[[l,c]].appendChild(VF[[l,c]])
        }
    }
    for(l=0;l<Linhas;l++){
        VF[[l,c]] = document.createTextNode("=")

        VF_td[[l,c]] = document.createElement("td")
        VF_td[[l,c]].appendChild(VF[[l,c]])
    }

    // limpa as variaveis e cria botão
    for(c=0;c<Saidas;c++){
        for(l=0;l<Linhas;l++){
        
            Solusao[[l,c]] = false

            input[[l,c]] = document.createElement("input")
            input[[l,c]].type="button"
            input[[l,c]].value="F"
            input[[l,c]].setAttribute("id",""+l+c)
            input[[l,c]].setAttribute("onclick","Ler_Botao("+l+","+c+")")

            td[[l,c]] = document.createElement("td")
            td[[l,c]].appendChild(input[[l,c]])

        }
    }

    // adiciona as linhas nas colunas
    for(l=1;l<(Linhas+1);l++){
        tr[l] = document.createElement("tr")
        for(c=0;c<Number(Entradas)+1;c++){
            tr[l].appendChild(VF_td[[(l-1),c]])
        }
        for(c=0;c<Saidas;c++){
            tr[l].appendChild(td[[(l-1),c]])
        }
        table.appendChild(tr[l])
    }

    tabela.appendChild(table)
    console.log(tabela)

}
Criar_Tabela(2,1)

function Ler_Botao(Botao,Tamanho){

    let id_botao = document.getElementById(""+Botao+Tamanho)

    if(Solusao[[Botao,Tamanho]] == true){
        Solusao[[Botao,Tamanho]] = false
        id_botao.setAttribute("value", "F")
    }else{
        Solusao[[Botao,Tamanho]] = true
        id_botao.setAttribute("value", "V")
    }
    console.log(Solusao[[Botao,Tamanho]] + " " + Botao+"/"+Tamanho)
}

function Calculo(){

    let Linhas = 2**Number(Numero_Entradas)
    let Codigo = []
    let Codigo2 = []
    let Codigo_final = []

    let cont_Min = 0
    let cont_Max = 0

    for(c=0;c<Numero_Saidas;c++){
        Codigo[c] = ""
        Codigo2[c] = ""
        Codigo_final[c] = ""

        cont_Min = 0
        cont_Max = 0
        
        for(l=0;l<Linhas;l++){
            
            if(Solusao[[l,c]] == true){
                for(a=65;a<(65+Number(Numero_Entradas));a++){
                    
                    if(Binario[[l,(a-65)]] == "F"){
                        Codigo[c] = Codigo[c] + String.fromCharCode(a)
                        Codigo[c] = `${Codigo[c]}\"`
                        Codigo[c] = Codigo[c] + "."
                    }else{
                        Codigo[c] = Codigo[c] + String.fromCharCode(a)
                        Codigo[c] = Codigo[c] + "."
                    }
                    
                }
                Codigo[c] = Codigo[c].slice(0,-1)
                Codigo[c] = Codigo[c] + "+"

                cont_Min++
            }else{
                for(a=65;a<(65+Number(Numero_Entradas));a++){
                    
                    if(Binario[[l,(a-65)]] == "V"){
                        Codigo2[c] = Codigo2[c] + String.fromCharCode(a)
                        Codigo2[c] = `${Codigo2[c]}\"`
                        Codigo2[c] = Codigo2[c] + "+"
                    }else{
                        Codigo2[c] = Codigo2[c] + String.fromCharCode(a)
                        Codigo2[c] = Codigo2[c] + "+"
                    }
                    
                }
                Codigo2[c] = Codigo2[c].slice(0,-1)
                Codigo2[c] = Codigo2[c] + "."

                cont_Max++
            }
        }

        Codigo[c] = Codigo[c].slice(0,-1)
        Codigo2[c] = Codigo2[c].slice(0,-1)

        console.log(cont_Min + " --- " + cont_Max)

        if(cont_Max > cont_Min){
            Codigo_final[c] = Codigo[c]
            if(Codigo_final[c] == ""){
                Codigo_final[c] = "apenas F"
            }

        }else{
            Codigo_final[c] = Codigo2[c]
            if(Codigo_final[c] == ""){
                Codigo_final[c] = "apenas V"
            }

        }
        console.log("Solução seila "+Number(c+1)+" "+ Codigo[c])
        console.log("Solução "+Number(c+1)+" "+ Codigo_final[c])

    }
    console.log("------------")
    document.getElementById("Resultado_Bruto").innerHTML = "";
    document.getElementById("Resultado_Bruto").innerHTML = Codigo_final
}

function Simplificar(Resumido){

//subistituir pelo teste

}

function tests(){

    // * 0 ou n
    // + 1 ou n
    // ? 0 ou 1
    // (A)(?!") = não pode ter " no final

    // A.A+C = A+C / A+A.C = A

    let Resumido = `A.(C+A+D)`
    //((A.(C+B))+(A.B)) = (A.(B+B+C))
    //A.(B.C+(B.C)") = A.1
    //A.B.C+A.C"+A.B" = A
    //A".B"+A.B"+A".B+A.B = 1
    //A".B".C".D"+A.B".C".D"+A".B.C".D"+A.B.C".D"+A".B".C.D"+A.B".C.D"+A".B.C.D"+A.B.C.D"+A".B".C".D+A.B".C".D+A".B.C".D+A.B.C".D+A".B".C.D+A.B".C.D+A".B.C.D+A.B.C.D

    const execao_1 = /((?<!\()([A-Z]"?)(\.|\+)([A-Z]"?)(\3([A-Z]"?))+(?!\)))/g
    // A+C+X.C = (A+C+X).C | A+X.C = (A+X).C | C.T+A = C.(T+A) ! ($1$7)
    const execao_2 = /((([A-Z]"?)(\.[A-Z]"?)+)(\+)((([A-Z]"?)(\.[A-Z]"?)+)))|((([A-Z]"?)(\+[A-Z]"?)+)(\.)((([A-Z]"?)(\+[A-Z]"?)+)))/g
    // A+C".A+B" = (A+C").(A+B") | A.C"+A.B" = (A.C")+(A.B") ! ($2$11)$5$14($6$15)

    const tudo_mais_1 = /(\((([A-Z]"?)|\+|\.|(\((.+)\)))+\)\+1(?!\.))|((?<!\.)1\+\((([A-Z]"?)|\+|\.|(\((.+)\)))+\))/g
    // (A.E.D+Q)+1 ou 1+(A.E.D+Q) = 1 ! 1
    const tudo_ponto_1 = /((\((([A-Z]"?)|\+|\.|(\((.+)\)))+\))\.1)|(1\.(\((([A-Z]"?)|\+|\.|(\((.+)\)))+\)))/g
    // (A.E.D+Q).1 ou 1.(A.E.D+Q) = 1 ! $2$8
    const tudo_mais_0 = /((\((([A-Z]"?)|\+|\.|(\((.+)\)))+\))\+0(?!\.))|((?<!\.)0\+(\((([A-Z]"?)|\+|\.|(\((.+)\)))+\)))/g
    // (A.E.D+Q)+0 ou 0+(A.E.D+Q) = 1 ! $2$8
    const tudo_ponto_0 = /((\((([A-Z]"?)|\+|\.|(\((.+)\)))+\))\.0)|(0\.(\((([A-Z]"?)|\+|\.|(\((.+)\)))+\)))/g
    // (A.E.D+Q).0 ou 0.(A.E.D+Q) = 1 ! 0

    const junta_AA = /(((([A-Z]"?)|\.|\+|(\((.+)\)))+)(\.|\+)\2(?!"|\.))|(((([A-Z]"?)|\.|\+|(\((.+)\)))+)((\.|\+)(([A-Z]"?)(\+|\.))+([A-Z]"?))\15\9(?!"|\.))|(((([A-Z]"?)|\.|\+|(\((.+)\)))+)(((\.|\+)\((([A-Z]"?)|\.|\+|(\((.+)\)))+\))+)\28\22(?!"|\.))/g
    // A+Z.A+Z = A.Z ou (A+(Z.E)).(A+(Z.E)) = (A+(Z.E)) ! $2$9$14$24$26

    const situa_R_0 = /((?<!\.)(0(\+|\.)0)(?!\.))|((?<!\.)(0\.(1|([A-Z]"?)))(?!\.))|((?<!\.)((1|([A-Z]"?))\.0)(?!\.))/g
    //0+0 0.0 0.1 1.0 = 0 | A.0 A".0 0.A 0.A" = 0 !0
    const situa_R_1 = /((?<!\.)(1(\+|\.)1)(?!\.))|((?<!\.)((0|([A-Z]"?))\+1)(?!\.))|((?<!\.)(1\+(0|([A-Z]"?)))(?!\.))/g
    //1.1 1+1 1+0 0+1 = 1 | A+1 A"+1 1+A 1+A" = 1 !1 
    const situa_R_A = /((?<!\.)([A-Z]"?)(\+|\.)(0|1))(?!\.)|((?<!\.)(0|1)(\+|\.)([A-Z]"?)(?!\.))/g
    //A+0 0+A A.1 1.A = A | A"+0 0+A" A".1 1.A" = A" ! $2$8
    const situa_R_0_2 = /(([A-Z])\.\2")|(([A-Z])(")\.\4(?!"))/g
    //A".A A.A" = 0 ! 0
    const situa_R_1_2 = /((?<!\.)([A-Z])\+\2"(?!\.))|((?<!\.)([A-Z])(")\+\4(?!\.|"))/g
    //A"+A A+A" = 1 ! 1
    
    const situa_R_AA = /(?<!\.)(([A-Z]"?)(\+|\.)\2)(?!\.)/g
    //A+A A.A = A | A"+A" A".A" = A" ! $2
    const situa_A_A = /(\()?(([A-Z]"?)((\+|\.)([A-Z]"?))+)(\.|\+)\3(?!")(\))?/g
    // A+X+A = A+X ! $1$2$8

    const tira_parentes = /\((([A-Z]"?)|(1|0))\)/g
    // (A) = A
    const tira_ulti_parentes = /(?<!"|\.|\+)\((([A-Z]"?)((\+|\.)(([A-Z]"?)))+)\)(?!"|\.|\+)/g
    //(A.C) = A.C
    const tira_rep_parentes = /\(\(((([A-Z]"?)|\.|\+|(\(.+\)))+)\)\)/g
    // ((A+Z)) = (A+Z)


    const abisor = /(([A-Z]"?)\+\(?([A-Z]"?\.)+\2(?!")\)?)|(([A-Z]"?)\+\(?\5(\.[A-Z]"?)+\)?)|(([A-Z]"?)\.\(([A-Z]"?\+)+\8(?!")\))|(([A-Z]"?)\.\(\11(\+[A-Z]"?)+\))/g
    //A+(A.B) e A+B.A = A ou A.(A+B) e A.(B+A) = A !$2$5$8$11
    const abisor_2 = /(([A-Z])\+\(([A-Z]"?\.)+\2"\))|(([A-Z])\+\(\5"(\.[A-Z]"?)+\))|(([A-Z])\.\(([A-Z]"?\+)+\8"\))|(([A-Z])\.\(\11"(\+[A-Z]"?)+\))/g
    //X+(X".Y)=X+Y
    //A.(A"+B)=A.B
    //A+(A.B) = A
    //A".(A"+B) = A"

    const distri_AB = /((?<!\.)([A-Z]"?)(\+|\.)\(([A-Z]"?(\.|\+))*\2((\+|\.)([A-Z]"?))*\))|((?<!\.)([A-Z])(\+|\.)\(([A-Z]"?(\.|\+))*\10"((\+|\.)([A-Z]"?))*\))|((?<!\.)([A-Z])"(\+|\.)\(([A-Z]"?(\.|\+))*\18((\+|\.)([A-Z]"?))*\))/g
    //Z"+(A.Z") | Z.(A+Z.S.R) | X+(X".Y) | A".(S.A) ! (/?/)
    const distri_BA = /((\(([A-Z]"?(\+|\.))*([A-Z]"?)((\.|\+)([A-Z]"?))*\))(\+|\.)\5(?!"|\.))|((\(([A-Z]"?(\+|\.))*([A-Z])((\.|\+)([A-Z]"?))*\))(\+|\.)\14"(?!\.))|((\(([A-Z]"?(\+|\.))*([A-Z])"((\.|\+)([A-Z]"?))*\))(\+|\.)\23(?!"|\.))/g
    //(A.Z")+Z" = Z"+(A.Z") | (A+Z.S.R).Z = Z.(A+Z.S.R)| (X".Y)+X = X+(X".Y)| (S.A).A" = A.(S.A) ! $5$14$23$9$18$27$2$11$20


    const distri_2 = /(\(([A-Z]"?)(\+|\.)([A-Z]"?)\))(\+|\.)(\(([A-Z]"?)\3([A-Z]"?)\))/g
    // (A+B).(D"+C) = (A.D")+(A.C)+(B.D")+(B.C) !($2$5$7)$3($2$5$8)$3($4$5$7)$3($4$5$8)

    const distri_3 = /(\(?)([A-Z]"?)((\+|\.)([A-Z]"?))+(\)?)((\+|\.)\1([A-Z]"?)(\4([A-Z]"?))+\6)+/g
    // (A.D")+(A.C)+(B.D")+(B.C) = (A+B).(D"+C)
    const distri_exe_3 = /([A-Z]"?)(([A-Z]"?)|\.|\+|\(|\))*(\1"?)/g
    // B(qualquer letra, ponto e mais)B = true

    const outra_mult = /\(([A-Z])\+([A-Z](?<!\1))\)\.\(\1\+([A-Z](?<!\1|\2))\)/g // (A+B).(A+C) = A+B.C

    const morgan = /\((([A-Z]"?)|\+|\.|(\((([A-Z]"?)|\+|\.|(\((([A-Z]"?)|\.|\+|(\((([A-Z]"?)|\+|\.|(\((([A-Z]"?)|\+|\.|(\((([A-Z]"?)|\+|\.|(\(([A-Z]"?)|\+|\.)\))*\))*)\)))*\)))*\)))*\)))*\)"/g // (A.B)’ = A'+B' !(/?/)
    // (A+C)" = A".C" | A.(B.C+(B.C+(S+T))") = A.(B.C+B"+C".(S".T"))
    const situa_grupo_AZmaisAZ = /((\(?)([A-Z]")(\.([A-Z]"))+\+([A-Z])(\.([A-Z]))+(?!")\)?)|((\()([A-Z]")(\.([A-Z]"))+\)\+\(([A-Z])(\.([A-Z]))+(?!")\))|((\(?)([A-Z])(\.([A-Z]))+\+([A-Z]")(\.([A-Z]"))+\)?)|((\()([A-Z])(\.([A-Z]))+\)\+\(([A-Z]")(\.([A-Z]"))+\))/g
    // A".B"+A.B ou A.B+A".B" ou (A".B")+(A.B) ! 1
    const situa_grupo_AZpontoAZ = /((\(?)([A-Z]")(\+([A-Z]"))+\.([A-Z])(\+([A-Z]))+(?!")\)?)|((\()([A-Z]")(\+([A-Z]"))+\)\.\(([A-Z])(\+([A-Z]))+(?!")\))|((\(?)([A-Z])(\+([A-Z]))+\.([A-Z]")(\+([A-Z]"))+\)?)|((\()([A-Z])(\+([A-Z]))+\)\.\(([A-Z]")(\+([A-Z]"))+\))/g
    // A"+B".A+B ou A+B.A"+B" ou (A"+B").(A+B) ! 0

    const comu_adi = 0 // A + B = B + A
    const comu_mult = 0 // A . B = B . A

    const asso_adi = 0 // A+(B+C) = (A+B)+C = A+B+C
    const asso_mult = 0 // A.(B.C) = (A.B).C = A.B.C

    console.log(Resumido)

    let comtador = 0
    let c = 1

    while(c != 0){

        if(comtador == 99){ // trava de segurança
            c = c-1
            console.log("maximo de 100 execuções")
        }

        if(Resumido.match(execao_1) != null){
            Resumido = Resumido.replace(execao_1,"($1)")
        }else if(Resumido.match(execao_2) != null){
            Resumido = Resumido.replace(execao_2,"($2$11)$5$14($6$15)")

        }else if(Resumido.match(tudo_mais_1) != null){
            Resumido = Resumido.replace(tudo_mais_1,"1")
        }else if(Resumido.match(tudo_ponto_1) != null){
            Resumido = Resumido.replace(tudo_ponto_1,"$2$8")
        }else if(Resumido.match(tudo_mais_0) != null){
            Resumido = Resumido.replace(tudo_mais_0,"$2$8")
        }else if(Resumido.match(tudo_ponto_0) != null){
            Resumido = Resumido.replace(tudo_ponto_0,"0")
            
        }else if(Resumido.match(junta_AA) != null){
            Resumido = Resumido.replace(junta_AA,"$2$9$14$24$26")
            
        }else if(Resumido.match(situa_R_0) != null){
            Resumido = Resumido.replace(situa_R_0,"0")
        }else if(Resumido.match(situa_R_1) != null){
            Resumido = Resumido.replace(situa_R_1,"1")
        }else if(Resumido.match(situa_R_0_2) != null){
            Resumido = Resumido.replace(situa_R_0_2,"0")
        }else if(Resumido.match(situa_R_1_2) != null){
            Resumido = Resumido.replace(situa_R_1_2,"1")
            
        }else if(Resumido.match(situa_R_A) != null){
            Resumido = Resumido.replace(situa_R_A,"$2$8")
        }else if(Resumido.match(situa_R_AA) != null){
            Resumido = Resumido.replace(situa_R_AA,"$2")
        }else if(Resumido.match(situa_A_A) != null){
            Resumido = Resumido.replace(situa_A_A,"$1$2$8")
        
        }else if(Resumido.match(tira_parentes) != null){
            Resumido = Resumido.replace(tira_parentes,"$1")
        }else if(Resumido.match(tira_rep_parentes) != null){
            Resumido = Resumido.replace(tira_rep_parentes,"($1)")

        }else if(Resumido.match(tira_ulti_parentes) != null){
            Resumido = Resumido.replace(/^\(/,"")
            Resumido = Resumido.replace(/\)$/,"")
        

        }else if(Resumido.match(distri_BA) != null){
            Resumido = Resumido.replace(distri_BA,"$5$14$23$9$18$27$2$11$20")
        }else if(Resumido.match(distri_AB) != null){// A+C+(A.D) = A+C
            let a = Resumido.match(distri_AB)
            Resumido = Resumido.replace(distri_AB,"(/?/)")
            console.log(a)

            for(l=0;l<a.length;l++){
                let primeira_letra = a[l].match(/^([A-Z]"?)/g)
                let segunda_letra = a[l].match(RegExp(`${primeira_letra}"?`,"g"))
                console.log(segunda_letra)
                
                let sinais = a[l].match(/(\+|\.)/g)
                let sinal = ""
                for(l2=0;l2<sinais.length;l2++){
                    sinal = sinal + sinais[l2]
                }
                console.log(sinal)

                if(sinal.match(/^\+\.+/g) != null){
                    if(segunda_letra[0] == segunda_letra[segunda_letra.length-1]){
                        a[l] = primeira_letra
                    }else{

                    }

                }else if(sinal.match(/^\.\++/g) != null){
                    if(segunda_letra[0] == segunda_letra[segunda_letra.length-1]){
                        a[l] = primeira_letra
                    }else{

                    }

                }else{

                }
                Resumido = Resumido.replace(/\(\/\?\/\)/,a[l])
            }
        
        }else if(Resumido.match(morgan) != null){
            let a = Resumido.match(morgan)
            Resumido = Resumido.replace(morgan,'(/?/)')

            for(l=0;l<a.length;l++){
                a[l] = a[l].replace(/([A-Z]"?)/g,'$1"')

                a[l] = a[l].replace(/(\.)/g,'?')
                a[l] = a[l].replace(/(\+)/g,'.')
                a[l] = a[l].replace(/(\?)/g,'+')

                a[l] = a[l].replace(/\((.+)\)\"/g,'$1')
                a[l] = a[l].replace(/""/g,'')
                Resumido = Resumido.replace(/\(\/\?\/\)/,a[l])
            }

        }else if((Resumido.match(distri_3) != null) && (Resumido.match(distri_exe_3) != null)){
            let a = Resumido.match(distri_3)
            Resumido = Resumido.replace(distri_3,'(/?/)')
            let Letra_Repete = []

            //pega a letra mais repetida
            for(l=0;l<a.length;l++){    
                Letra_Repete[l] = Letra_Repetida(a[l])
            }
            
            for(l=0;l<a.length;l++){
                
                let Etapa_Final = ""

                let primeiro_sinal = a[l].replace(/\(?([A-Z]"?)\)?/g,"")
                let segundo_sinal = primeiro_sinal

                primeiro_sinal = primeiro_sinal.match(/^(\.|\+)/g)
                segundo_sinal = segundo_sinal.replaceAll(primeiro_sinal,"")
                segundo_sinal = segundo_sinal.match(/^(\.|\+)/g)

                if(segundo_sinal == null){
                    segundo_sinal = primeiro_sinal
                }

                //console.log("primeiro sinal = "+primeiro_sinal)
                //console.log("segundo sinal = "+segundo_sinal)

                let conjuntos = a[l].match(/(\(?([A-Z]"?)(\+([A-Z]"?))+\)?)|(\(?([A-Z]"?)(\.([A-Z]"?))+\)?)/g)
                let manten = segundo_sinal
                let tira_letra = ""

                for(l2=0;l2<conjuntos.length;l2++){
                    if(conjuntos[l2].match(RegExp(`(${Letra_Repete[l].letra})(?!")`,"g")) != null){
                        if(conjuntos[l2].match(/(\(?((\+|\.)([A-Z]"?)(\+|\.)(?<!\3)([A-Z]"?)\3)\)?)/g) != null){
                            conjuntos[l2] = conjuntos[l2].slice(0,-1)
                            conjuntos[l2] = conjuntos[l2].slice(1)
                        }
                        tira_letra = tira_letra + conjuntos[l2] + segundo_sinal
                    }else{
                        if(conjuntos[l2].match(/(\(?((\+|\.)([A-Z]"?)(\+|\.)(?<!\3)([A-Z]"?)\3)\)?)/g) != null){
                            conjuntos[l2] = conjuntos[l2].slice(0,-1)
                            conjuntos[l2] = conjuntos[l2].slice(1)
                        }
                        manten = manten + conjuntos[l2] + segundo_sinal
                    }
                }
                manten = manten.slice(0,-1)
                tira_letra = tira_letra.slice(0,-1)

                tira_letra = tira_letra.replace(RegExp(`(${Letra_Repete[l].letra})(?!")`,"g"),"")
                
                while(tira_letra.match(/(((\.|\+|\()\.+)|((\+|\.|\()(\+|\)))+)|((?<![A-Z])"(?<![A-Z]))|(^(\.|\+|"))|((\.|\+)$)/g) != null){

                    tira_letra = tira_letra.replace(/((\.)\.)|((\+)\+)/g,"$2$4")
                    tira_letra = tira_letra.replace(/\((\.|\+|")/g,"(")
                    tira_letra = tira_letra.replace(/(\.|\+|")\)/g,")")
                    tira_letra = tira_letra.replace(/(^(\.|\+|"))|((\.|\+)$)/g,"")

                    if(segundo_sinal == "+"){
                        tira_letra = tira_letra.replace(/(\+\.)|(\.\+)/g,"+")
                    }else{
                        tira_letra = tira_letra.replace(/(\+\.)|(\.\+)/g,".")
                    }
                }

                if(a[l].match(/(^\()|(\)$)/) != null){
                    Etapa_Final = Etapa_Final + "("
                }
                Etapa_Final = Etapa_Final + Letra_Repete[l].letra
                Etapa_Final = Etapa_Final + primeiro_sinal + "("
                Etapa_Final = Etapa_Final + tira_letra
                Etapa_Final = Etapa_Final + ")" + manten
                if(a[l].match(/(^\()|(\)$)/) != null){
                    Etapa_Final = Etapa_Final + ")"
                }

                Etapa_Final = Etapa_Final.replace(/(\+|\.)\(\)/g,"")

                Resumido = Resumido.replace(/\(\/\?\/\)/,Etapa_Final)
            }
            console.log("distri 3")
            
        }else if(Resumido.match(situa_grupo_AZmaisAZ) != null){
            let Base = Resumido.match(situa_grupo_AZmaisAZ)
            Resumido = Resumido.replace(situa_grupo_AZmaisAZ,'(/?/)')
            //console.log(Base)
          
            for(l=0;l<Base.length;l++){
                let com_aspas = Base[l].match(/([A-Z]")(\.([A-Z]"))+/g)
                let sem_aspas = Base[l].match(/([A-Z])(\.([A-Z]))+(?!")/g)

                //console.log(com_aspas)
                //console.log(sem_aspas)

                for(l2=0;l2<com_aspas.length;l2++){
                    com_aspas[l2] = com_aspas[l2].replace(/"/g,"")
                }

                if(Compara_Conjunto(com_aspas,sem_aspas) == true ){
                    Resumido = Resumido.replace(/\(\/\?\/\)/,"1")
                }else{
                    Resumido = Resumido.replace(/\(\/\?\/\)/,Base[l])
                    c++
                }
            }

        }else if(Resumido.match(situa_grupo_AZpontoAZ) != null){
            let Base = Resumido.match(situa_grupo_AZpontoAZ)
            Resumido = Resumido.replace(situa_grupo_AZpontoAZ,'(/?/)')
            //console.log(Base)
          
            for(l=0;l<Base.length;l++){
                let com_aspas = Base[l].match(/([A-Z]")(\.([A-Z]"))+/g)
                let sem_aspas = Base[l].match(/([A-Z])(\.([A-Z]))+(?!")/g)

                //console.log(com_aspas)
                //console.log(sem_aspas)

                for(l2=0;l2<com_aspas.length;l2++){
                    com_aspas[l2] = com_aspas[l2].replace(/"/g,"")
                }

                if(Compara_Conjunto(com_aspas,sem_aspas) == true){
                    Resumido = Resumido.replace(/\(\/\?\/\)/,"0")
                }else{
                    Resumido = Resumido.replace(/\(\/\?\/\)/,Base[l])
                    c++
                }
            }

        }else{
            console.log("Resultado final: ")
            c = c-1
        }
        comtador += 1
        console.log(Resumido)
    }

    console.log(comtador+" passos")
    
}

/*

let current_counter = 1;
let regex = new RegExp(`\\[${current_counter}\\]`, 'g');
let novo_valor = 'teste[1]'.replace(regex, `[${current_counter + 1}]`);
console.log(novo_valor); // teste[2]

*/

function Letra_Repetida(texto){

    let letra = texto.match(/[A-Z]"?/g)

    let elemen = letra.filter(function(este, i) {
        return letra.indexOf(este) === i;
    })

    var conta_elemen = []
    for(l2=0;l2<elemen.length;l2++){
        conta_elemen[l2] = {
            'letra':elemen[l2],
            'quantidade':0
        }
    }

    for(l2=0;l2<elemen.length;l2++){
        for(l3=0;l3<letra.length;l3++){

            if(conta_elemen[l2].letra == letra[l3]){
                conta_elemen[l2].quantidade = conta_elemen[l2].quantidade +1

            }
        }
    }

    let Letra_Repete = conta_elemen.reduce(function(prev, current) { 
        return prev.quantidade >= current.quantidade ? prev : current; 
    })

    return Letra_Repete
}

function Compara_Conjunto(texto1, texto2){
    texto1.sort()
    texto2.sort()
    if(texto1.length == texto2.length){
        let test = 0
        for(c=1;c<=texto1.length;c++){
            if(texto1[c] == texto2[c]){
                test++
            }
        }
        if(test == texto1.length){
            return true
        }else{
            return false
        }

    }else{
        return false
    }

}