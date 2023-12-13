function Calculo(){
    let valor = document.getElementById("A").value

    let p = document.createElement("p")
    let text_p = document.createTextNode(Simplificar(valor))
    p.appendChild(text_p)
    document.getElementById("resultados").appendChild(p)

}