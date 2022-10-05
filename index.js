
// vai requisitar uma API
async function cadastrar(){
    // recuperar os dados do usuário
    let id = document.getElementById("id").value
    let nome = document.getElementById("nome").value
    let funcao = document.getElementById("funcao").value
    let salario = document.getElementById("salario").value
    
    let dado
    let metodo // vai conter POST ou PUT
    if (id) { // vai atualizar
        metodo = 'PUT'
        dado = {
            id, nome, funcao, salario
        }
    }
    else { // cadastrar
        metodo = 'POST'
        dado = {
            nome, funcao, salario
        }
    }
    // criar o dado para enviar
    
    // chamar ou consumir a API utilizando fetch
    await fetch('http://localhost:3000/empregados', {
        method: metodo,
        body: JSON.stringify(dado),
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    .then(resposta => {
        alert('Cadastro foi realizado com sucesso')
    })
    .catch( error => {
        alert(error)
    })
    
    renderUsers()
}

// remove um pokemon do banco de dados
// quem chamar a função remove pode fazer outra ação antes de
// receber resposta
async function remove(id){
    let confirma = confirm(`Confirma exclusão do empregado? `)
    if (confirma){ // confirma é true
        // chama a api -> é síncrona (aguardamos o retorna do servidor)
        await fetch(`http://localhost:3000/empregado/${id}`, {
            method:'DELETE'
        })
        .then (response => { // quando o servidor retornou
            alert(`Empregado foi removido com sucesso`)
            consultar()
        })
        .catch( error => { // houve erro na comunicação com servidor
            alert(`Problema na remoção`)
        })
    }
    
}

function atualiza(id, nome, salario, funcao){
    // insere no formulário os dados do pokemon que será atualizado
    document.getElementById("id").value = id
    document.getElementById("nome").value = nome
    document.getElementById("funcao").value = funcao
    document.getElementById("salario").value = salario    
}


async function getUsers() {
    let url = 'http://localhost:3000/empregados';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();    

    let html = '';
    users.forEach(user => {
        let htmlSegment = `                        

                        <table class="table mt-5">
                        <thead>
                            <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Função</th>
                            <th scope="col">Salário</th>
                            <th scope="col">Alterar</th>
                            <th scope="col">Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">${user.id}</th>
                                <td>${user.nome}</td>
                                <td>${user.funcao}</td>
                                <td>${user.salario}</td>
                                <td><i class="bi bi-pencil-square" onClick="atualiza(${user.id}, '${user.nome}', '${user.salario}', '${user.funcao}')" ></i></td>
                                <td><i class="bi bi-x-circle-fill" onClick='remove(${user.id})'></i></td>
                            </tr>                            
                        </tbody>
                        </table>`

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();
