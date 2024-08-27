/* PEGA OS ELEMENTOS DO HTML */
let inputTarefa = document.getElementById('inputTarefa');
let btnAdicionar = document.getElementById('btnAdicionar');
let tarefas = document.getElementById('tarefas');

/* CARREGA AS TAREFAS DO LOCALSTORAGE */
carregarTarefas();

/* ADICIONA EVENTO AO CLIQUE DO BOTÃO ADICIONAR */
btnAdicionar.addEventListener('click', () => {
    if (inputTarefa.value.trim() === "") {
        inputTarefa.style.border = "1px solid red";
        let error = document.getElementById('error');
        error.innerHTML = "Campo obrigatório !";
        error.style.color = "red";
        setTimeout(() => {
            inputTarefa.style.border = "none";
            error.innerHTML = "";
        }, 3000);
    } else {
        adicionarTarefa(inputTarefa.value);
        inputTarefa.value = "";
    }
});

/* FUNÇÃO PARA ADICIONAR TAREFA */
function adicionarTarefa(texto) {
    let li = document.createElement("li");
    li.innerHTML = '<i class="fa-solid fa-check" onclick="cheklist(this)"></i>' + texto + '<i class="fa-solid fa-trash" onclick="deletar(this)"></i>';
    document.querySelector("ul").appendChild(li);
    salvarTarefas();
}

/* FUNÇÃO CHEKLIST */
function cheklist(elemento) {
    let li = elemento.parentElement;
    li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
    salvarTarefas();
}

/* FUNÇÃO DELETAR */
function deletar(elemento) {
    elemento.parentElement.remove();
    salvarTarefas();
}

/* FUNÇÃO PARA SALVAR TAREFAS NO LOCALSTORAGE */
function salvarTarefas() {
    let tarefas = [];
    document.querySelectorAll('ul li').forEach(li => {
        tarefas.push({
            texto: li.innerText,
            concluida: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

/* FUNÇÃO PARA CARREGAR TAREFAS DO LOCALSTORAGE */
function carregarTarefas() {
    let tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        JSON.parse(tarefasSalvas).forEach(tarefa => {
            let li = document.createElement("li");
            li.innerHTML = '<i class="fa-solid fa-check" onclick="cheklist(this)"></i>' + tarefa.texto + '<i class="fa-solid fa-trash" onclick="deletar(this)"></i>';
            if (tarefa.concluida) {
                li.style.textDecoration = "line-through";
            }
            document.querySelector("ul").appendChild(li);
        });
    }
}