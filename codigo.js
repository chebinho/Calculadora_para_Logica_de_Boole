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
        //console.log("Solução Maior "+Number(c+1)+" "+ Codigo[c])
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
    // test() retorna true ou fause

    let Resumido = `A.B.A"+B" = B" | (A".B").(A+B) = 0 | A".B".(A+B) = 0 | A+B+C.A+B"+C.A+B+C".A+B"+C" = A | A+B+C".A"+B+C".A+B"+C".A"+B"+C" = C" | (A+B").(A"+B") = B" | A.B.C+A.C"+A.B" = A | (A.D")+(A.C)+(B.D")+(B.C) = (A+B).(D"+C) | A".B"+A.B"+A".B+A.B = 1 | A+A".B = A+B`
    //A+B".A"+B" = B" <-----

    //A+A".B = A+B
    //(A.D")+(A.C)+(B.D")+(B.C) = (A+B).(D"+C)
    //A.B.C+A.C"+A.B" = A
    //A".B"+A.B"+A".B+A.B = 1
    //(A+B).(A+C) = A+B.C
    //A".B".C".D"+A.B".C".D"+A".B.C".D"+A.B.C".D"+A".B".C.D"+A.B".C.D"+A".B.C.D"+A.B.C.D"+A".B".C".D+A.B".C".D+A".B.C".D+A.B.C".D+A".B".C.D+A.B".C.D+A".B.C.D+A.B.C.D

    const execao_1 = /(?<=\s|^|\)\+|\)\.)([A-Z]"?(\+[A-Z]"?)+)\.((([A-Z]"?(\+[A-Z]"?)+)(\.))*)?([A-Z]"?(\+[A-Z]"?)+)(?=\s|$|\+\(|\.\()/g
    // A+D".A+C.B+D".B+C = (A+D").A+C.B+D".(B+C) ! ($1).$3($8)
    const execao_2 = /(?<=\)\.)([A-Z]"?(\+[A-Z]"?)+)(?=\.\()/g
    // (A+D").B+D".(B+C) = (A+D").(B+D").(B+C) ! ($1)

    const execao_3 = /((\+)(([A-Z]"?)(\.([A-Z]"?))+))|((([A-Z]"?)(\.([A-Z]"?))+)(\+))/g
    // A+C+X.C = A+C+(X.C) | C+X.C.D = C+(X.C.D) | A+X.C = (A+X).C | C.T+A = C.(T+A) | A+C.D+X = A+(C.D)+X ! $2($3$8)$12

    // (A.E.D+Q)+1 ou 1+(A.E.D+Q) = 1 ! 1
    // (A.E.D+Q).1 = A ! $2
    // 1.(A.E.D+Q) = A ! $2
    // (A.E.D+Q)+0 = A ! $2
    // 0+(A.E.D+Q) = A ! $2
    // (A.E.D+Q).0 ou 0.(A.E.D+Q) = 0 ! 0

    const tira_parentes = /\((([A-Z]"?)|(1|0))?\)(?!")/g
    // (A) = A
    const tira_rep_parentes = /\(\(((([A-Z]"?)|\.|\+|(\(.+\)))+)\)\)/g
    // ((A+Z)) = (A+Z)
    const tira_sinal_parent = /((\+|\.)\(([A-Z]"?(\2[A-Z]"?)+)\)\2)|((\+|\.)\(([A-Z]"?(\6[A-Z]"?)+)(?!\6)\))|((?<!\.)\(([A-Z]"?((\+)[A-Z]"?)+)\)\12)|((?<!\+)\(([A-Z]"?((\.)[A-Z]"?)+)\)\16)/g
    // (A".B").(A+B) = A".B".(A+B) | (A+B).(A".B") = (A+B).A".B" | .(A".B".T). = .A".B".T. ! $2$3$2$6$7$10$12$14$16

    const junta_AA = /(((([A-Z]"?)|\.|\+|(\((.+)\)))+)(\.|\+)\2(?!"|\.))|(((([A-Z]"?)|\.|\+|(\((.+)\)))+)((\.|\+)(([A-Z]"?)(\+|\.))+([A-Z]"?))\15\9(?!"|\.))|(((([A-Z]"?)|\.|\+|(\((.+)\)))+)(((\.|\+)\((([A-Z]"?)|\.|\+|(\((.+)\)))+\))+)\28\22(?!"|\.))/g
    // A+Z.A+Z = A.Z ou (A+(Z.E)).(A+(Z.E)) = (A+(Z.E)) ! $2$9$14$24$26
    const situa_grupo_A_mais_Ai = /((\(([A-Z]"?)(\+|\.|\(|\)|([A-Z]"?))+\))\+\2")|((\(([A-Z]"?)(\+|\.|\(|\)|([A-Z]"?))+\))"\+\7(?!"))/g
    // (B.X)+(B.X)" = 1 | (B.X)"+(B.X) = 1 ! 1
    const situa_grupo_A_ponto_Ai = /((\(([A-Z]"?)(\+|\.|\(|\)|([A-Z]"?))+\))\.\2")|((\(([A-Z]"?)(\+|\.|\(|\)|([A-Z]"?))+\))"\.\7(?!"))/g
    // (B.X).(B.X)" = 0 | (B.X)".(B.X) = 0 ! 0

    const situa_R_0 = /((0(\+|\.)0))|((0\.(1|([A-Z]"?))))|(((1|([A-Z]"?))\.0))/g
    //0+0 0.0 0.1 1.0 = 0 | A.0 A".0 0.A 0.A" = 0 !0
    const situa_R_1 = /((?<!\.)(1\+1)(?!\.))|((?<!\.)((0|([A-Z]"?))\+1)(?!\.))|((?<!\.)(1\+(0|([A-Z]"?)))(?!\.))|(1\.1)/g
    //1.1 1+1 1+0 0+1 = 1 | A+1 A"+1 1+A 1+A" = 1 !1 
    const situa_R_A = /(([A-Z]"?)\.(0|1))|((0|1)\.([A-Z]"?))|((?<!\.)([A-Z]"?)\+(0|1)(?!\.))|((?<!\.)(0|1)\+([A-Z]"?)(?!"|\.))/g
    //A+0 0+A A.1 1.A = A | A"+0 0+A" A".1 1.A" = A" ! $2$6$8$12
    const situa_R_0_2 = /(([A-Z])\.\2")|(([A-Z])(")\.\4(?!"))/g
    //A".A A.A" = 0 ! 0
    const situa_R_1_2 = /((?<!\.)([A-Z])\+\2"(?!\.))|((?<!\.)([A-Z])(")\+\4(?!\.|"))/g
    //A"+A A+A" = 1 ! 1
    
    const situa_R_AA = /(?<!\.)(([A-Z]"?)(\+|\.)\2)(?!\.)/g
    //A+A A.A = A | A"+A" A".A" = A" ! $2
    const situa_A_A = /(([A-Z]"?)(\.|\+)(([A-Z]"?)|\3|(\(((\.|([A-Z]"?)|\+|(\((\+|\.|([A-Z]"?))+\))))+\)))+)\3\2(?!")/g
    // A+X+A = A+X ! $1
    const situa_A_A_mais = /(([A-Z])"\+(\+|([A-Z])|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?))+\)))+\)))+\)))+\2(?!"))|(([A-Z])\+(\+|([A-Z])|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?))+\)))+\)))+\)))+\15")/g
    // A"+X+S+A = 1 | A+X+S+A" = 1 ! 1
    const situa_A_A_ponto = /(([A-Z])"\.(\.|([A-Z])|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?))+\)))+\)))+\)))+\2(?!"))|(([A-Z])\.(\.|([A-Z])|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?)|(\((\+|\.|([A-Z]"?))+\)))+\)))+\)))+\15")/g
    // A".X.S.A = 0 | A.X.S.A" = 0 ! 0

    const reescrever_1 = /(\(((([A-Z]"?)(\+|\.))*)?([A-Z])"(((\+|\.)([A-Z]"?))*)?\)(\+|\.)\(\2\6\7\))|(\(((([A-Z]"?)(\+|\.))*)?([A-Z])(((\+|\.)([A-Z]"?))*)?\)(\+|\.)\(\13\17"\18\))/g
    // (A".B".C")+(A.B".C") = ((A+A").B".C") | (A.B".C")+(A".B".C") = ((A+A").B".C") ! ($2$13($6$11$6$17"$22$17)$7$18)

    const reescrever_2 = /((?<!\(\()([A-Z]"?)(\+|\.)((([A-Z]"?)|\+|\.|\(|\))+)(\+|\.)([A-Z]"?)\3\4)|(((([A-Z]"?)|\+|\.|\(|\))+)(\+|\.)([A-Z]"?)(\.|\+)\10\13([A-Z]"?)(?!\)\)))/g
    // A.(D"+C)+B.(D"+C) = (A+B).(D"+C) | (D"+C).A+(D"+C).B = (D"+C).(A+B) ! $10$13($14$13$16$2$7$8)$3$4
    const reescrever_3 = /(\(([A-Z]"?)(\+|\.)((([A-Z]"?)|\+|\.|\(|\))+)\)(?<=\)\))(\+|\.)([A-Z]"?)\3\4)|(\((?<=\(\()((([A-Z]"?)|\+|\.|\(|\))+)(\+|\.)([A-Z]"?)\)(\.|\+)\10\13([A-Z]"?))/g
    // (((D"+C).A)+(D"+C).B) = ((D"+C).(A.B)) | ((A.(D"+C))+B.(D"+C)) = ((A+B).(D"+C)) ! $10$13($14$13$16$2$7$8)$3$4
    const reescrever_4 = /(([A-Z]"?)(\+|\.)(\((([A-Z]"?)|\+|\.|\(|\)(?!\)))+\))(\+|\.)\(([A-Z]"?)\3\4\))|((\((([A-Z]"?)|\+|\.|\(|\))+\))(\+|\.)([A-Z]"?)(\.|\+)\(\10\13([A-Z]"?)\))/g
    // (A.(D"+C)+(B.(D"+C))) = ((A+B).(D"+C)) | ((D"+C).A+((D"+C).B)) = ((D"+C).(A.B)) ! $10$13($14$13$16$2$7$8)$3$4
    const reescrever_5 = /(\(([A-Z]"?)(\+|\.)((([A-Z]"?)|\+|\.|\(|\))+\))\)(\+|\.)\(([A-Z]"?)\3\4\))|(\((\((([A-Z]"?)|\+|\.|\(|\))+)(\+|\.)([A-Z]"?)\)(\.|\+)\(\10\13([A-Z]"?)\))/g
    // ((A.(D"+C))+(B.(D"+C))) = ((A+B).(D"+C)) | (((D"+C).A)+((D"+C).B)) = ((D"+C).(A.B)) ! $10$13($14$13$16$2$7$8)$3$4

    const distri_AB = /(([A-Z]"?)(\+|\.)([A-Z]"?\3)*\(([A-Z]"?(\.|\+))*\2((\+|\.)([A-Z]"?))*\))|(([A-Z])(\+|\.)([A-Z]"?\12)*\(([A-Z]"?(\.|\+))*\11"((\+|\.)([A-Z]"?))*\))|(([A-Z])"(\+|\.)([A-Z]"?\21)*\(([A-Z]"?(\.|\+))*\20((\+|\.)([A-Z]"?))*\))/g
    //Z"+(A.Z") = Z" | Z.(A+Z.S.R) = Z | X+(X".Y) = X+Y | A".(S.A) = A".S ! (/?/)
    const distri_BA = /((\(([A-Z]"?(\+|\.))*([A-Z]"?)((\.|\+)([A-Z]"?))*\))(\.|\+)(([A-Z]\9)*)?\5(?!"))|((\(([A-Z]"?(\+|\.))*([A-Z])((\.|\+)([A-Z]"?))*\))(\+|\.)(([A-Z]\20)*)?(\16"))|((\(([A-Z]"?(\+|\.))*([A-Z])"((\.|\+)([A-Z]"?))*\))(\+|\.)(([A-Z]\32)*)?\28)/g
    //(A.Z")+Z" = Z"+(A.Z") | (A+Z.S.R).Z = Z.(A+Z.S.R) | (X".Y)+X = X+(X".Y) | (S.A).A" = A.(S.A) ! $2$13($6$11$6$17"$22$17)$7$18

    const distri_3 = /((\((([A-Z]"?\.)*)?([A-Z]"?)((\.[A-Z]"?)*)?\))\+(\(([A-Z]"?|\+|\.)+\)\+)*(\((([A-Z]"?\.)*)?\5((\.[A-Z]"?)*)?\)))|((\((([A-Z]"?\+)*)?([A-Z]"?)((\+[A-Z]"?)*)?\))\.(\(([A-Z]"?|\+|\.)+\)\.)*(\((([A-Z]"?\+)*)?\19((\+[A-Z]"?)*)?\)))/g
    // (A.D")+(A.C)+(B.D")+(B.C) = (A+B).(D"+C)

    // morgan (A.B)’ = A'+B' | (A+C)" = A".C" | A.(B.C+(B.C+(S+T))") = A.(B.C+B"+C".(S".T")) !(/?/)

    // A".B"+A+B ou A.B+A"+B" ou (A".B")+(A+B) ! 1
    // A"+B".A.B ou A.B.A"+B" ou (A".B").(A+B) ! 0

    console.log(Resumido)

    let comtador = 0
    let c = 1
    let atualizar = -1

    while(c != 0){

        if(comtador == 9999){ // trava de segurança
            c = c-1
            console.log("maximo de 10000 execuções")
        }

        if(atualizar != Quantos_Entre(Resumido)){
            //console.log("atualizou")

            let Tudo_Entre_Paren = Cria_TEP(Resumido)
            // (\\(([A-Z]"?|\\+|\\.!!!)+\\)) + |(\\(([A-Z]"?|\\+|\\.!!!)+\\)) 2 4 6
            atualizar = Quantos_Entre(Resumido)

            var tira_ulti_parentes = RegExp(`(?<=\\s|^)\\(((([A-Z]"?)|\\+|\\.|${Tudo_Entre_Paren})*)\\)(?=\\s|$)`,"g")
            //(A.C) = A.C

            var tudo_mais_1 = RegExp(`(${Tudo_Entre_Paren}\\+1(?!\\.))|((?<!\\.)1\\+${Tudo_Entre_Paren})`,"g")
            // (A.E.D+Q)+1 ou 1+(A.E.D+Q) = 1 ! 1
            var tudo_ponto_1_01 = RegExp(`((${Tudo_Entre_Paren})\\.1)`,"g")
            // (A.E.D+Q).1 = A ! $2
            var tudo_ponto_1_02 = RegExp(`(1\\.(${Tudo_Entre_Paren}))`,"g")
            // 1.(A.E.D+Q) = A ! $2
            var tudo_mais_0_01 = RegExp(`((${Tudo_Entre_Paren})\\+0(?!\\.))`,"g")
            // (A.E.D+Q)+0 = A ! $2
            var tudo_mais_0_02 = RegExp(`((?<!\\.)0\\+(${Tudo_Entre_Paren}))`,"g")
            // 0+(A.E.D+Q) = A ! $2
            var tudo_ponto_0 = RegExp(`((${Tudo_Entre_Paren})\\.0)|(0\\.(${Tudo_Entre_Paren}))`,"g")
            // (A.E.D+Q).0 ou 0.(A.E.D+Q) = 0 

            var morgan = RegExp(`\\(${Tudo_Entre_Paren}\\)"`,"g")
            // (A.B)’ = A'+B' | (A+C)" = A".C" | A.(B.C+(B.C+(S+T))") = A.(B.C+B"+C".(S".T")) !(/?/)
        }

        if(Resumido.match(execao_1) != null){
            Resumido = Resumido.replace(execao_1,"($1).$3($8)")
        }else if(Resumido.match(execao_2) != null){
            Resumido = Resumido.replace(execao_2,"($1)")
        }else if(Resumido.match(execao_3) != null){
            Resumido = Resumido.replace(execao_3,"$2($3$8)$12")

        }else if(Resumido.match(tira_parentes) != null){
            Resumido = Resumido.replace(tira_parentes,"$1")
        }else if(Resumido.match(tira_rep_parentes) != null){
            Resumido = Resumido.replace(tira_rep_parentes,"($1)")
        }else if(Resumido.match(tira_ulti_parentes) != null){
            Resumido = Resumido.replace(tira_ulti_parentes,"$1")
        }else if(Resumido.match(tira_sinal_parent) != null){
            Resumido = Resumido.replace(tira_sinal_parent,"$2$3$2$6$7$10$12$14$16")

        }else if(Resumido.match(tudo_mais_1) != null){
            Resumido = Resumido.replace(tudo_mais_1,"1")
        }else if(Resumido.match(tudo_ponto_1_01) != null){
            Resumido = Resumido.replace(tudo_ponto_1_01,"$2")
        }else if(Resumido.match(tudo_ponto_1_02) != null){
            Resumido = Resumido.replace(tudo_ponto_1_02,"$2")
        }else if(Resumido.match(tudo_mais_0_01) != null){
            Resumido = Resumido.replace(tudo_mais_0_01,"$2")
        }else if(Resumido.match(tudo_mais_0_02) != null){
            Resumido = Resumido.replace(tudo_mais_0_02,"$2")
        }else if(Resumido.match(tudo_ponto_0) != null){
            Resumido = Resumido.replace(tudo_ponto_0,"0")
            
        }else if(Resumido.match(junta_AA) != null){
            Resumido = Resumido.replace(junta_AA,"$2$9$14$24$26")
        }else if(Resumido.match(situa_grupo_A_mais_Ai) != null){
            Resumido = Resumido.replace(situa_grupo_A_mais_Ai,"1")    
        }else if(Resumido.match(situa_grupo_A_ponto_Ai) != null){
            Resumido = Resumido.replace(situa_grupo_A_ponto_Ai,"0")
            
        }else if(Resumido.match(situa_R_0) != null){
            Resumido = Resumido.replace(situa_R_0,"0")
        }else if(Resumido.match(situa_R_1) != null){
            Resumido = Resumido.replace(situa_R_1,"1")
        }else if(Resumido.match(situa_R_0_2) != null){
            Resumido = Resumido.replace(situa_R_0_2,"0")
        }else if(Resumido.match(situa_R_1_2) != null){
            Resumido = Resumido.replace(situa_R_1_2,"1")
            
        }else if(Resumido.match(situa_R_A) != null){
            Resumido = Resumido.replace(situa_R_A,"$2$6$8$12")
        }else if(Resumido.match(situa_R_AA) != null){
            Resumido = Resumido.replace(situa_R_AA,"$2")
            
        }else if(Resumido.match(situa_A_A) != null){
            Resumido = Resumido.replace(situa_A_A,"$1")      
        }else if(Resumido.match(situa_A_A_mais) != null){
            Resumido = Resumido.replace(situa_A_A_mais,"1")
        }else if(Resumido.match(situa_A_A_ponto) != null){
            Resumido = Resumido.replace(situa_A_A_ponto,"0")
        
        }else if(Resumido.match(reescrever_1) != null){
            Resumido = Resumido.replace(reescrever_1,'($2$13($6$11$6$17"$22$17)$7$18)')
            //console.log("reescrever_1")
        }else if(Resumido.match(reescrever_2) != null){
            Resumido = Resumido.replace(reescrever_2,"$10$13($14$13$16$2$7$8)$3$4")
            //console.log("reescrever_2")
        }else if(Resumido.match(reescrever_3) != null){
            Resumido = Resumido.replace(reescrever_3,"$10$13($14$13$16$2$7$8)$3$4")
            //console.log("reescrever_3")
        }else if(Resumido.match(reescrever_4) != null){
            Resumido = Resumido.replace(reescrever_4,"$10$13($14$13$16$2$7$8)$3$4")
            //console.log("reescrever_4")
        }else if(Resumido.match(reescrever_5) != null){
            Resumido = Resumido.replace(reescrever_5,"$10$13($14$13$16$2$7$8)$3$4")
            //console.log("reescrever_5")
        
        }else if(Resumido.match(distri_BA) != null){
            Resumido = Resumido.replace(distri_BA,"$5$9$10$2$23$20$21$13$28$32$33$25")
        }else if(Resumido.match(distri_AB) != null){
            //console.log("distri_AB")
            let a = Resumido.match(distri_AB)
            Resumido = Resumido.replace(distri_AB,"(/?/)")
            //console.log("matris = "+a)

            for(l=0;l<a.length;l++){
                let primeira_letra = a[l].match(/^([A-Z]"?)/g)

                let inver_letra = primeira_letra + '"'
                inver_letra = inver_letra.replace(/""/g,"")

                let segunda_letra = a[l].match(RegExp(`(${primeira_letra}"?)|(${inver_letra}"?)`,"g")).slice(1).toString()
                
                let sinal = a[l].match(/(\+|\.|\(|\))/g).toString()

                //console.log("primeira letra = "+primeira_letra)
                //console.log("inverso da primeira = "+inver_letra)
                //console.log("segunda letra = "+segunda_letra)
                //console.log("conjunto de sinais = "+sinal)

                if(segunda_letra.match(RegExp(`${primeira_letra}(?!")`,"g")) != null){
                    // A A
                    if(sinal.match(/(^(\+,)+\((\.|\,|(\(((\+|\.|,)+)\)))+\)$)|(^(\.,)+\((\+|\,|(\(((\+|\.|,)+)\)))+\)$)/g) != null){ 
                        // .,(,+,+,) | +,(,.,(,.,),)
                        a[l] = a[l].replace(/(^([A-Z]"?))(\+|\.)((([A-Z]"?)\3)*)?\((\+|\.|\(|\)|([A-Z]"?))+\)/,"$4")+primeira_letra
                        // A.(B+A) = A
                    }else{
                        a[l] = a[l].replace(/\(|\)/g,"")
                    }

                }else{
                    // A" A
                    if(sinal.match(/(^(\+,)+\((\.|\,|(\(((\+|\.|,)+)\)))+\)$)|(^(\.,)+\((\+|\,|(\(((\+|\.|,)+)\)))+\)$)/g) != null){ 
                        // .,(,+,+,) | +,(,.,(,.,),) 
                        if(a[l].match(/((([A-Z])\+)([A-Z]"?\+)*(\((([A-Z]"?)\.)*(\3")(\.([A-Z]"?))*\)))|((([A-Z])"\+)([A-Z]"?\+)*(\((([A-Z]"?)\.)*(\13)(\.([A-Z]"?))*\)))/g) != null){
                            // A+C+(Q.C.A") | A"+(Q.A.C)
                            a[l] = a[l].replace(RegExp(`(\\.(${inver_letra})(?!"))|((?<=\\()((${inver_letra})\\.))`,"g"),"") 
                            // A+(Q.C)
                        }else if(a[l].match(/((([A-Z])\.)([A-Z]"?\.)*(\((([A-Z]"?)\+)*(\3")(\+([A-Z]"?))*\)))|((([A-Z])"\.)([A-Z]"?\.)*(\((([A-Z]"?)\+)*(\13)(\+([A-Z]"?))*\)))/g) != null){
                            // A.(Q+C+A") | A".(Q+A+C)
                            a[l] = a[l].replace(RegExp(`(\\+(${inver_letra})(?!"))|((?<=\\()((${inver_letra})\\+))`,"g"),"")
                            // A+(Q.C)
                        }
                        
                    }else{
                        a[l] = a[l].replace(/\(|\)/g,"")
                    }
                }

                Resumido = Resumido.replace(/\(\/\?\/\)/,a[l])
            }
        
        }else if(Resumido.match(morgan) != null){
            //console.log("morgan")
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

        }else if(Resumido.match(distri_3) != null){
            //console.log("distri 3")
            let a = Resumido.match(distri_3)
            Resumido = Resumido.replace(distri_3,'(/?/)')
            let Letra_Repete = []

            //pega a letra mais repetida
            for(l=0;l<a.length;l++){    
                Letra_Repete[l] = Letra_Repetida(a[l])
            }
            //console.log(Letra_Repete)
            
            for(l=0;l<a.length;l++){
                
                let Etapa_Final = ""

                let primeiro_sinal = a[l].replace(/\(?([A-Z]"?)\)?/g,"")
                let segundo_sinal = primeiro_sinal

                primeiro_sinal = primeiro_sinal.match(/^(\.|\+)/g)
                segundo_sinal = segundo_sinal.replaceAll(primeiro_sinal,"").match(/^(\.|\+)/g)

                if(segundo_sinal == null){
                    segundo_sinal = primeiro_sinal
                }

                //console.log("primeiro sinal = "+primeiro_sinal)//---
                //console.log("segundo sinal = "+segundo_sinal)//---

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

                //console.log(tira_letra)//---
                //console.log(manten)//---

                tira_letra = tira_letra.replace(RegExp(`((\\.|\\+)(${Letra_Repete[l].letra})(?!"))|((?<=\\()((${Letra_Repete[l].letra})(\\.|\\+)))`,"g"),"") 
            
                //console.log(tira_letra)/---

                Etapa_Final = Etapa_Final + Letra_Repete[l].letra
                Etapa_Final = Etapa_Final + primeiro_sinal + "("
                Etapa_Final = Etapa_Final + tira_letra
                Etapa_Final = Etapa_Final + ")" + manten

                Etapa_Final = Etapa_Final.replace(/(\+|\.)\(\)/g,"")

                Resumido = Resumido.replace(/\(\/\?\/\)/,Etapa_Final)
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

function Quantos_Entre(texto="A",par1="\\(",par2="\\)"){

    let pares = RegExp(`${par1}${par2}`,"g")
    let c = 0

    texto = texto.replace(RegExp(`[^${par1}^${par2}]`,"g"),"")
    while((texto.match(pares) != null)||(c>10000)){
        texto = texto.replace(pares,"")
        c++
    }
    if(c==10000){console.log("limite de pares atingido")}

    return c
}
function Cria_TEP(Resumido){
    let Tudo_Entre_Paren = '(\\(([A-Z]"?|\\+|\\.!!!)+\\))' // |(\\(([A-Z]"?|\\+|\\.!!!)+\\))
    for(t=0;t<Quantos_Entre(Resumido)-1;t++){
        Tudo_Entre_Paren = Tudo_Entre_Paren.replace(/\!\!\!/g,'|(\\(([A-Z]"?|\\+|\\.!!!)+\\))')
    }
    Tudo_Entre_Paren = Tudo_Entre_Paren.replace(/\!\!\!/g,'')
    return Tudo_Entre_Paren
}

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