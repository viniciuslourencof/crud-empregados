let bd = [{id:1, nome:'Vinicius', funcao:'SAC', salario:1500.00}];

exports.post = (req, res, next) => {

    const { empregado }  = req;
    bd.push(empregado);

    res.status(201).send('Requisição recebida com sucesso!');
};
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};
exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};

exports.get = (req, res, next) => {  
    res.status(200).send(bd);
};