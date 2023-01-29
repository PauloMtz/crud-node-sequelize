const express = require('express')
const exphbs = require('express-handlebars')
var consign = require('consign')
const bodyParser = require("body-parser");
const connection = require('./connect')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// with force equals true, the system drops all tables and create them again in database
// it needs the controller: require('./models/modelName')
//connection.sync({ force: true })
connection.sync()
    .then(() => console.log('Conectado com sucesso!'))
    .catch(() => console.log('Não foi possível conectar ao banco de dados.'))

app.set("views", "./src/views");
app.use(express.static('src/public'))

// body parser para receber os dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

consign().include('src/controllers').into(app)

module.exports = app