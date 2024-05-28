import { verificarTema, trocarTema } from "../../helpers/tema-helpers"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let quiz = {}
let pontos = 0
let pergunta = 1

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema)
})

verificarTema(body, botaoTema)

function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img")
    const assuntoTitulo = document.querySelector(".assunto h1")
    divIcone.classList(assunto.toLocaleLowerCase)
    iconeImg.setAttribute("scr", `../../assets/images/icon-${assunto.toLocaleLowerCase()}.svg`)
    iconeImg.setAttribute('alt', `icone de ${assunto}`)
    assuntoTitulo.innerText = assunto
}

async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dados.title === assunto) {
                quiz = dado
            }
        });
    })
}


function montarPergunta() {
    const main = document.querySelector("main")
    main.inneHTML = `
    <section class="pergunta">
            <div>
                <p>Questão ${pergunta}</p>
                <h2>${alterarSinais(quiz.question[pergunta-1].question)}</h2>
            </div>
            <div class="barra_progresso">
                <div style width: ${pergunta * 10}></div>
            </div>
        </section>

        <section class="alternativas">
            <form action="">
                <label for="alternativa_a">
                    <input type="radio" id="alternativa_a" name="alternativa">
                    <div>
                        <span>A</span>
                        ${alterarSinais(quiz.questions[pergunta-1].option[3])}
                    </div>
                </label>

                <label for="alternativa_b">
                    <input type="radio" id="alternativa_b" name="alternativa">
                    <div>
                        <span>B</span>
                        ${alterarSinais(quiz.questions[pergunta-1].option[3])}
                    </div>
                </label>

                <label for="alternativa_c">
                    <input type="radio" id="alternativa_c" name="alternativa">
                    <div>
                        <span>C</span>
                        ${alterarSinais(quiz.questions[pergunta-1].option[3])}
                    </div>
                </label>

                <label for="alternativa_d">
                    <input type="radio" id="alternativa_d" name="alternativa">
                    <div>
                        <span>D</span>
                        ${alterarSinais(quiz.questions[pergunta-1].option[3])}
                    </div>
                </label>
            </form>

            <button>Enviar</button>
        </section>
        `
}

function alterarSinais(texto) {
    return texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

async function inicar() {
    alterarAssunto()
    await buscarPerguntas()
    montarPergunta()
}

inicar()