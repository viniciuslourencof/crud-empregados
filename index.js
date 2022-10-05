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
        let htmlSegment = 
                        `

                        
                        <form>
                            <div class="form-group">
                                <label for="formGroupExampleInput">Nome</label>
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Digite o nome">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Função</label>
                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Digite a função">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Salário</label>
                                <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="Digite o salário">
                            </div>
                            <button type="button" class="btn btn-primary mt-2">Salvar</button>


                        </form>


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
                                <td><i class="bi bi-pencil-square"></i></td>
                                <td><i class="bi bi-x-circle-fill"></i></td>
                            </tr>                            
                        </tbody>
                        </table>`



        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();
