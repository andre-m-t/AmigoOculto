let id = 2;
let sort = [[1,2]] //lft:Pessoa X || rght:Saiu com

function sortearAmigo() {
    var min = 1;
    var max = id;
    var logada = document.getElementById("pessoa-logada").value;

    if (pendente(logada)) {
        var ok = false;

        while (!ok) {
            var numSort = gerarNumeroAleatorio(min, max);
            var liberado = true;

            for (var i = 0; i < sort.length; i++) {
                if (numSort === sort[i][1]) {
                    liberado = false;
                    break; // Não é necessário continuar verificando se já foi sorteado
                }
            }
            if(numSort != buscarIdPorNome(logada)){
                if (liberado) {
                    // Certifique-se de implementar buscarIdPorNome para obter o ID associado ao nome
                    sort.push([buscarIdPorNome(logada), numSort]);
                    document.getElementById("pessoa" + buscarIdPorNome(logada)).getElementsByTagName('td')[2].textContent = "OK"
                    ok = true;
                }
            }
        }

        console.log(sort);
    } else {
        window.alert("Você já sorteou o seu amigo chinelo!");
    }
}
function buscarIdPorNome(nome){
    for (var i = 1; i <= id; i++) { // Comece de 1 para evitar problemas com pessoa0
        if (document.getElementById("pessoa" + i).getElementsByTagName('td')[1].textContent == nome) {
            return i;
        }
    }
}
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function validarNumeroFormato(numero) {
    // Expressão regular para verificar se há pelo menos 9 dígitos
    var formatoRegex = /^\d{9,}$/;

    // Testa se o número corresponde ao formato e tem mais de 9 dígitos
    return formatoRegex.test(numero);
}
function adicionarParticipante() {
    var nome = document.getElementById("novo-participante").value;
    var telefone = document.getElementById("telefone-participante").value;
    if (document.getElementById("pessoa-logada").value === "admin" && !participando(nome) && validarNumeroFormato(telefone)) {
        id++;
        var situacao = "PENDENTE";
        var html = "<tr id='pessoa" + id + "'><td>" + id + "</td><td>" + nome + "</td><td>"+situacao+"</td><td>"+telefone+"</td></tr>";
        document.getElementById("corpo-tabela").insertAdjacentHTML("beforeend", html);
    } else {
        window.alert("Insira todos os dados corretamente!");
    }
}

function participando(nome) {
    for (var i = 1; i <= id; i++) { // Comece de 1 para evitar problemas com pessoa0
        if (document.getElementById("pessoa" + i).getElementsByTagName('td')[1].textContent == nome) {
            return true;
        }
    }
    return false; // Retorna false após percorrer todas as linhas
}
function pendente(nome) {
    for (var i = 1; i <= id; i++) {
        var pessoa = document.getElementById("pessoa" + i).getElementsByTagName('td')[1].textContent;
        var situacao = document.getElementById("pessoa" + i).getElementsByTagName('td')[2].textContent;

        if (pessoa == nome && situacao == "PENDENTE") {
            return true;
        }
    }
    return false;
}
function controlarBotaoSortear() {
    var botao = document.getElementById("sortear-button");
    var pessoaLogada = document.getElementById("pessoa-logada").value;
    if (participando(pessoaLogada) && pendente(pessoaLogada)) {
        botao.disabled = false;
    } else {
        botao.disabled = true;
    }
}

window.onload = function () {
    document.getElementById("pessoa-logada").addEventListener("change", controlarBotaoSortear);
}