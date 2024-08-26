/* PEGA OS ELEMENTOS DO HTML */
let inputTarefa = document.getElementById('inputTarefa');
let btnAdicionar = document.getElementById('btnAdicionar');
let tarefas = document.getElementById('tarefas');


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
        let li = document.createElement("li");
        li.innerHTML = '<i class="fa-solid fa-check" onclick="cheklist(this)"></i>' + inputTarefa.value + '<i class="fa-solid fa-trash" onclick="deletar(this)"></i>';
        document.querySelector("ul").appendChild(li);
        inputTarefa.value = "";
    }
});

/* FUNÇÃO CHEKLIST */
function cheklist(elemento) {
    let li = elemento.parentElement;
    li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
}

/* FUNÇÃO DELETAR */
function deletar(elemento) {
    elemento.parentElement.remove();
}


function carregarTarefas() {
    console.log('Carregando tarefas...');
    let tarefasSalvas = localStorage.getItem('tarefas');
    console.log('Tarefas salvas:', tarefasSalvas);
    if (tarefasSalvas) {
        tarefas.innerHTML = tarefasSalvas;
        console.log('Tarefas carregadas com sucesso');
    } else {
        console.log('Nenhuma tarefa encontrada no localStorage');
    }
}

