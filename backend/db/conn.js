//db/conn.js

const { Sequelize } = require('sequelize')
//troca a senha quando tiver no meu PC
const sequelize = new Sequelize('supMate', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectado ao banco!')
} catch (error) {
    console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize