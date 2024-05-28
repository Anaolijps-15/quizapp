import { trocarTema, verificarTema } from "./helpers/tema-helpers"


const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

const botoesAssunto = document.querySelectorAll(".assuntos button")
botoesAssunto.forEach(botao => {
    botao.addEventListener("click", selecionarAssunto)
})

function selecionarAssunto() {
    const classeBotao = evento.tagert.className
    const assunto = document.querySelector(`.${classeBotao}span`).innerText
    localStorage.setItem("assunto", assunto)
    window.location.href = "./pages/quiz/quiz.html"
}