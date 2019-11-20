//Código responsável por guardar toda configuração do express

require('marko/node-require').install();    //Habilitando o marko para trabalhar com o node
require('marko/express');                   //Habilitando o marko para trabalhar com o express

const express = require('express');           //Importando o módulo express
const app = express();                        //app = objeto do express que é utilizado pra criar rotas
const methodOverride = require('method-override');  //Importando o módulo de sobrescrita de métodos

app.use('/estatico', express.static('src/app/public')); //Criando um middleware que trabalha com arquivos estáticos

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));

//Criando um midleware de sobrescrita de método HTTP
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));

const rotas = require('../app/rotas/rotas');  //importando o módulo rotas
rotas(app);

module.exports = app;                         //exportando o app 