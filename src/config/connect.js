const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb',
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock"
  },
})

try {
  sequelize.authenticate()
} catch (error) {
  console.error('Ocorreu um erro ao tentar a conexão: ', error)
}

module.exports = sequelize