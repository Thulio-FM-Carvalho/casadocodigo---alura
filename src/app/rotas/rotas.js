const db = require('../../config/database');    //Importando o módulo database
const LivroDao = require('../infra/livro-dao'); //Importando a classe livroDao para ter acesso aos métodos

module.exports = (app) => {

    //Rota de edição dos livros
    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });

    //Rota relacionada a listagem de livros 
    app.get('/livros', function(req, resp){
        
        //Instanciando o banco de dados
        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
    
                )) 
                .catch(erro => console.log(erro));
    });

    //Nova rota de livros
    app.get('/livros/form', function(req, resp){
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    //Nova rota relacionada a adição de livros
    app.post('/livros', function(req, resp){
        console.log(req.body);

        //Instanciando o banco de dados
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros')) //usando o redirect para dizer qual a rota que queremos acionar
                .catch(erro => console.log(erro));
        
    });

    //Nova rota relacionada a edição de livros
    app.put('/livros', function(req, resp){
        console.log(req.body);

        //Instanciando o banco de dados
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros')) //usando o redirect para dizer qual a rota que queremos acionar
                .catch(erro => console.log(erro));
        
    });

    //Criando uma rota do tipo Delete
    //Criando a variável :id onde o ID será salvo
    app.delete('/livros/:id', function(req, resp) {
        
        const id = req.params.id; //Pegando o ID pelos parâmetros
          
        const livroDao = new LivroDao(db); //Fazendo a instância do BD

        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro)); 

    });

};