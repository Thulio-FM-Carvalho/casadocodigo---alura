//Classe resposável por fazer o acesso ao banco de dados referente aos Livros
//DAO = Data Acess Object
class LivroDao {

    constructor(db){
        this._db = db;
    }

    //Método lista com o uso de Promise
    lista(){
        //Promisse recebe duas funções que serão executadas quando resolver a primise ou reijeitá-la  
        //resolve: Resolver
        //reject:  Rejeitar
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                function(erro, resultados){
                    //Se aconteceu algum erro no aceso ao BD, rejeita
                    if (erro) return reject('Não foi possível listar os livros')
                    //Caso não aconteça nenhum erro, reolve a promise e envia o resultado 
                    return resolve(resultados)
                }
            )
        })
        
    }

    //Método adiciona com o uso de promise
    adiciona(livro){
        return new Promise((resolve, reject) => {
                this._db.run(`
                INSERT INTO LIVROS (
                        titulo,
                        preco,
                        descricao
                    ) values (?, ?, ?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function(erro) {
                    
                    if (erro) {
                        console.log(erro);
                        return reject("Não foi possível adicionar o livro!");
                    }

                    resolve();
                }
            )
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }

}

//Exportando a classe
module.exports = LivroDao;